---
source_path: /home/laudes/zoot/projects/yt_ts
extracted: 2026-04-22
---

## One-line pitch

Gradio app that turns raw YouTube trading-session transcripts into structured trade logs (Instrument / Type / Result / Notes) and appends them to a Google Sheet, with three LLM-backed variants (DeepSeek reasoner, OpenAI GPT-4o-mini, and a no-LLM regex-only fallback).

## Stack & dependencies

- **Language / runtime**: Python, single-file app, launched via `app.launch()` (Gradio).
- **UI**: `gradio==5.13.2` (`gradio_client==1.6.0`) — simple `gr.Interface` with Textbox inputs and Markdown output.
- **LLM clients**:
  - `openai==1.60.2` — used two ways:
    - Pointed at DeepSeek (`base_url="https://api.deepseek.com"`, model `deepseek-reasoner`) in `app-bu.py` / `app-bu-02.py` / `app-bu-03-a.py`.
    - Pointed at OpenAI proper (model `gpt-4o-mini`, `temperature=0`) in `app.py`.
- **Google integration**:
  - `google-auth-oauthlib==1.2.1`, `google-auth==2.38.0`, `google-api-python-client==2.160.0` (OAuth 2.0 installed-app flow via `credentials.json` → `token.json`).
  - `gspread==6.1.4` in later revisions; raw `googleapiclient.discovery.build('sheets','v4',...)` in earlier revisions.
- **Misc**: `python-dotenv==1.0.1`, `PyYAML==6.0.2`, `pandas==2.2.3` (imported but barely used), `nltk` (in `app-bu.py` only, for `sent_tokenize`; never exercised in final `interface`).
- **Secrets**: `.env` with `DEEPSEEK_API_KEY` and `SPREADSHEET_ID`; OAuth `credentials.json` + `token.json` checked in beside the code.
- **Scale**: ~1,253 LOC total across 9 files; main logic fits in ~220 lines per revision.

## Architecture sketch

One Gradio page → one `interface()` handler. Flow in the most feature-complete revision (`app-bu-03-a.py`):

1. User pastes a raw transcript (plus `channel`, sometimes `video_url`) into textboxes.
2. `extract_relevant_trading_data()` runs a compiled regex over ~21 trading keywords (`buy`, `sell`, `tp[0-9]*`, `sl`, `stop-loss`, `profit`, `loss`, `win`, `risk`, `break-even`, `drawdown`, `scalp`, `position`, `entry`, `exit`, `secured`, `liquidity`, `broker`, `leverage`, `pips`), grabs each match with ±1 line of context, dedupes while preserving order, strips `[Music]` / `[Applause]`, truncates to 500 lines.
3. Trimmed text + the YAML-loaded system prompt from `trading_system_prompt.yaml` is sent to DeepSeek's `deepseek-reasoner` model, asking for a pipe-delimited table: `Instrument | Trade Type | Result | Key Notes | Overall Summary`.
4. Response parser splits on `|`, skips header rows and `[-\s\-\|]+` separators, keeps rows with ≥5 columns.
5. Post-processing: rows where the first column is `-`/`---`/empty are treated as the "overall summary" row and merged into the first real trade row; subsequent rows have the summary column blanked.
6. Each row is prefixed with a timestamp and suffixed with the channel name, then `worksheet.append_rows(..., value_input_option="USER_ENTERED")` writes to `Sheet1` of the sheet identified by `SPREADSHEET_ID`.
7. Gradio returns a Markdown blurb with elapsed seconds and the appended payload.

Revision lineage visible in the directory:

- `app-bu.py` — oldest, raw `googleapiclient` Sheets calls, optional NLTK TextRank summarizer (commented out), DeepSeek call.
- `app-bu-02.py` — same but `interface()` actually crashes (`headers, rows = ''` after the AI call) — clearly a mid-edit snapshot.
- `app-bu-03.py` / `app-bu-04.py` (identical, 124 LOC) — pivot to **regex-only, no LLM**: just pre-processes and stores raw extracted text + word-count metadata. Adds `video_url` as a third input. Switches from `googleapiclient` to `gspread` for simpler appends.
- `app-bu-03-a.py` — re-adds the DeepSeek structured-table path on top of the regex preprocessor and tightens the parser.
- `app.py` (current entrypoint) — replaces DeepSeek with OpenAI `gpt-4o-mini` and narrows the task to "return only trade outcomes in the format `Gold Short → Win, GU Short → Win`". Sheet columns: `Channel | Video URL | Final processed text | Word Count Info | Outcome`.
- `goog.py` — standalone Sheets sanity check (reads `test.txt`, also hits `api.coincap.io`). Looks like the OAuth spike before the main app.

## Design decisions worth telling

- **Regex pre-filter before the LLM.** Transcripts are long and mostly noise; the ~21-pattern regex pass with ±1 line context shrinks input to trade-relevant lines and caps at 500 lines before any LLM call. Removes `[Music]` / `[Applause]` markers. Saves tokens and keeps the prompt under DeepSeek/OpenAI limits.
- **Provider swap via OpenAI SDK base_url.** DeepSeek is called through `OpenAI(api_key=..., base_url="https://api.deepseek.com")`, which makes switching providers a one-line change — and that's exactly what happens between `app-bu-03-a.py` (DeepSeek reasoner) and `app.py` (OpenAI `gpt-4o-mini`).
- **Externalised prompt + few-shot examples.** `trading_system_prompt.yaml` holds the extraction schema (Instrument / Trade Type / Result / Key Notes / Overall Summary), rules ("if no trades, omit trade details"), and a worked example. Loaded at import via `yaml.safe_load`, injected into the user message. Keeps prompt engineering out of Python.
- **Pipe-table as LLM I/O contract.** The prompt asks for pipe-delimited rows; the parser splits on `|`, rejects header lines and separator-only rows (`re.fullmatch(r'[\s\-\|]+', line)`), and enforces exactly 5 columns. Pragmatic structured-output via text rather than JSON/function-calling.
- **Overall-summary-as-sentinel-row convention.** Model can return a trade-detail row with `-` in the Instrument column to mean "this row is the session summary" — the post-processor detects that and merges it into the first real trade row, clearing the summary column on subsequent rows so Sheets doesn't get duplicate summaries.
- **Two storage APIs, same OAuth creds.** Early revisions use raw `googleapiclient.discovery` with `sheet.values().append(...)`; later revisions switch to `gspread.authorize(creds).open_by_key(...).worksheet("Sheet1").append_rows(...)` for less boilerplate. Same `token.json` works for both.
- **`app.py` final form trades structure for simplicity.** The "current" entrypoint abandons multi-column trade tables and just asks GPT-4o-mini for a compact outcome string (`Trade details → Outcome, separated by commas`) with `temperature=0`. One cell, one answer.
- **Inferred**: keeping multiple `app-bu-*.py` backups in-place (rather than git branches) is the dev loop — the directory is not a git repo.

## Concrete proof points

- `extract_relevant_trading_data` in `app-bu-03-a.py:48-72` — 21-pattern compiled regex, ±1 line context window, dedupe, `[Music]`/`[Applause]` strip.
- DeepSeek call via OpenAI SDK in `app-bu-03-a.py:111-133` (`base_url="https://api.deepseek.com"`, model `deepseek-reasoner`, `stream=False`).
- Pipe-table parser with header + separator rejection in `app-bu-03-a.py:142-160`.
- Overall-summary-row merge logic in `app-bu-03-a.py:181-205`.
- OpenAI `gpt-4o-mini` outcome extractor with `temperature=0` and the "Trade details → Outcome" contract in `app.py:67-94`.
- OAuth installed-app flow (`run_local_server(port=3000)`, token cached to `token.json`) in `app.py:24-40` (repeated identically across all revisions).
- YAML prompt + few-shot example in `trading_system_prompt.yaml` (35 lines, including the worked GBPJPY/Gold example).
- Dependency pins (Gradio 5.13.2, openai 1.60.2, gspread 6.1.4) in `requirements.txt`.

## Skills demonstrated

- **Python Services & Data Pipelines** — end-to-end text-in → structured-rows → Google Sheets pipeline; regex preprocessing; OAuth2 + Sheets API (both `googleapiclient` and `gspread`); env-var + YAML config; Gradio UI wiring.
- **AI / Agentic Systems** — LLM-based structured extraction with an externalised system prompt and few-shot example; pipe-table I/O contract with a defensive parser; provider-agnostic client (DeepSeek via OpenAI SDK) and iterative model selection (DeepSeek reasoner → OpenAI GPT-4o-mini); deterministic outputs via `temperature=0`.

## Open questions / dead-ends

- **No README / CLAUDE.md / docstring-level docs** — design decisions above are inferred from code and the prompt YAML; no pull quotes available (section omitted).
- **Not a git repo** — "last activity Feb 2025" comes from file mtimes (`app-bu-03-a.py`, `app-bu-04.py`, `app.py` all `Feb 2 2025`; `trading_system_prompt.yaml` `Feb 17 2025`; `token.json` `Feb 3 2025`). No commit history to verify, but the pattern of `app-bu-*.py` backups + no VCS suggests a **personal experiment / archived prototype**, not a maintained product.
- **No YouTube transcript fetcher in the repo.** Despite the directory name `yt_ts` ("YouTube transcripts"), there's no `yt-dlp`, no `youtube-transcript-api`, no `openai-whisper`. Transcripts are pasted into the Gradio textbox by hand. Upstream ingestion happens elsewhere or manually.
- **`.env` contains what looks like a real DeepSeek API key prefix.** Same repo checks in `credentials.json` and `token.json`. Flagging for secret hygiene if this ever leaves the laptop.
- **`app-bu-02.py` has a bug that makes it non-functional** (`headers, rows = ''` right after the API call overwrites results with a 2-char string that will then fail to unpack downstream); treat as a mid-refactor snapshot, not a shipped revision.
- **`pandas` is imported in `app-bu-02.py` / `app-bu-03-a.py` but never used** — leftover from an earlier DataFrame-based design.
- **Unclear which file is the "production" entrypoint.** `app.py` is newest and the obvious candidate, but it's a narrower design (outcome string only) than `app-bu-03-a.py` (full structured table). Possible the user was A/B-ing two different sheet schemas and never settled.
- **Inferred design rationale** in the "provider swap" and "regex pre-filter" bullets is deduced from the code diff across revisions, not from comments — flagged because there are no commit messages or docs to corroborate intent.

---

### Self-review (5-line summary)

1. `yt_ts` is a single-page Gradio tool that converts pasted YouTube trading-session transcripts into structured trade rows appended to Google Sheets.
2. Core pipeline: 21-pattern regex pre-filter with ±1 line context → LLM (DeepSeek `deepseek-reasoner` or OpenAI `gpt-4o-mini`) with an externalised YAML prompt → pipe-table parser → `gspread` append.
3. Six `app*.py` revisions (no git) show a clear iteration: raw `googleapiclient` → `gspread`, DeepSeek → OpenAI, full trade-table schema → compact outcome string.
4. Key strengths to surface: provider-agnostic OpenAI SDK usage, externalised prompts/few-shot, defensive LLM-output parsing with sentinel-row merge — fits "Python Services & Data Pipelines" + "AI / Agentic Systems".
5. Flagged: no README, no VCS, `.env` and OAuth `credentials.json`/`token.json` co-located with code; no YouTube-fetching code in repo despite the name; `app-bu-02.py` is mid-refactor broken — treated as archived Feb-2025 experiment in the write-up.
