# FirstPR Buddy 🚀

**Learn GitHub safely. Practice a simulated PR. Transition into a real open-source GitHub course.**

FirstPR Buddy is a free, beginner-friendly, open-source learning website for students who have never contributed to GitHub. It explains GitHub vocabulary in plain English, teaches the contribution workflow through an interactive **simulation**, and checks understanding with a five-question quiz.

## Who this helps

New programmers, non-CS students, first-generation college students, and anybody who wants to join open-source projects but feels overwhelmed by technical jargon. The app does not require an account or software installation.

## Features

- **Learn:** plain-language introductions to repositories, issues, and pull requests.
- **Practice:** eight simulated steps (fork, clone, branch, edit, add, commit, push, open PR).
- **Knowledge check:** five interactive questions with immediate explanations.
- **Real GitHub bridge:** guided path based on MIT-licensed GitHub Skills Introduction to GitHub, with a link to create the official course repository and a clearly self-reported four-step milestone checklist.
- **Security checkpoint:** original, interactive exercise for avoiding accidental secret exposure in code commits.
- **Progress:** simulated practice and self-reported GitHub checklist progress saved locally using localStorage.
- **Accessibility:** semantic headings, labels, keyboard interaction, focus styles, and mobile-friendly layout.
- **Private/offline:** no backend, tracking, AI model, or GitHub login is required. The local lessons and simulations work without network access after downloading the project. **Starting the official GitHub Skills course requires an internet connection and GitHub sign-in**.

**Important:** the practice lab is a safe simulation. It never runs Git commands, creates real GitHub forks, or opens actual pull requests. The real course button takes learners to GitHub, where they can create a separate exercise repository.

## Run locally

1. Download and unzip this repository.
2. Open `index.html` in Chrome, Edge, Firefox, or Safari.
3. Click **Try the practice lab**, or jump to **Learn**, **Quiz**, or **Resources**.

Or open the folder in VS Code and use the Live Server extension. No build tools or dependency installation are necessary.

## Project files

```
firstpr-buddy/
├── index.html        # Page content and accessible markup
├── styles.css        # Responsive design
├── script.js         # Practice lab and quiz logic
├── README.md         # Project description and instructions
├── CONTRIBUTING.md   # How to help improve the project
├── THIRD_PARTY_NOTICES.md  # Credits for existing educational sources
├── .gitignore        # Local editor and OS files to ignore
└── LICENSE           # MIT open-source license
```

## How to demo (about 2 minutes)

1. Explain the audience: students new to open source.
2. Show the three plain-English concept cards.
3. Start the simulation; fork, fill a sample clone command, and complete more steps until the demo PR is opened.
4. Answer a quiz question and show feedback.
5. Open **Real PR**: explain the GitHub Skills MIT-licensed curriculum milestones and the official course link.
6. Mark a milestone in the self-reported tracker; demonstrate the original **security checkpoint**.
7. Show the source credit in `THIRD_PARTY_NOTICES.md`, then README.

## Verification and limits

Automated Chromium checks (October 31, 2026) passed at desktop (1440 × 900) and mobile (375 × 812) viewports: simulated eight-step workflow, rejection of an invalid sample command, quiz 5/5 and restart, GitHub Skills checklist and reset, and both safe/unsafe security answers. No unexpected JavaScript errors or horizontal overflow were found in these checks. In-browser persistence was checked in a simulated storage environment; final manual testing in Edge, external link opening, and GitHub publishing still must be completed by the presenter. No independent learner study has been performed.

## How we would measure impact

- A new learner completes the guided practice workflow without external help.
- The learner can correctly answer at least four of five quiz questions.
- The learner starts the official GitHub Skills exercise. (Our manual checklist records **self-reported** milestones; it does **not** verify GitHub progress.)

The first two can be observed in a usability test; the third can be checked by participant feedback. **This is a proposed evaluation plan, not a claim that usability testing has already occurred.**

## Hack Day details

- **Track:** Open Source Education (OSPO at UT San Antonio)
- **Also entered in:** Best Overall (automatic for submissions)
- **Project pitch:** FirstPR Buddy helps complete beginners understand and practice the GitHub pull-request process before they try their first real open-source contribution.
- **Built during:** RowdyLaunch Hack Day, October 31, 2026
- **Project owner and presenter:** Shraddha Surve
- **Development disclosure:** HTML/CSS/JS starter and enhancements were AI-assisted. The presenter selected the track and product direction and is reviewing/testing the deliverable before submission. Describe any additional changes or teammates accurately.

## Technology and dependencies

HTML5, CSS3 and vanilla JavaScript. No runtime JS frameworks or APIs; the official GitHub Skills exercise opens in a separate tab. **Educational curriculum adapted from the MIT-licensed [GitHub Skills Introduction to GitHub](https://github.com/skills/introduction-to-github)**. The First Contributions repository is linked as another MIT-licensed open-source learning resource. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Our browser code, self-reported checklist, safe simulation, and secret-safety check are independent of the external projects.

**AI assistance:** An AI assistant generated the initial starter and helped create the upgraded version and automated browser tests. The presenter should truthfully describe their own decisions, changes, and manual testing. Do not claim the project was coded entirely by hand.

## Open-source reuse and attribution

- Reused/adapted **learning milestone structure**, not GitHub Skills application code.
- Licensed original training source: GitHub Skills — Introduction to GitHub (MIT; copyright GitHub, Inc.).
- First Contributions is an external MIT-licensed resource link, not embedded source code.
- Our original work: site UI, command simulation, quiz, independent progress tracker, and security scenario.
- See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for links and license notices.

## License

MIT. See [LICENSE](LICENSE).
