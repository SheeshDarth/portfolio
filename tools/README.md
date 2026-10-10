# Rebuilding the résumé and detailed CV

The two PDFs are generated from `build_resume.py` with ReportLab; no browser or external data fetch is used. The script uses an invariant canvas so identical source text produces stable output.

Use Python 3.10 or newer. From the repository root, install the pinned PDF dependency and build both files:

```powershell
py -m pip install -r tools/requirements-resume.txt
py tools/build_resume.py
```

The outputs are `assets/Siddharth-P-Resume.pdf` (one-page base résumé) and `assets/Siddharth-P-CV.pdf` (categorized detailed CV). Review page counts, extracted text, links, and rendered pages after changing content; a successful build alone does not guarantee a correct layout.
