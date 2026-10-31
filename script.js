/* FirstPR Buddy: a dependency-free, offline-friendly training demo.
   Everything in the lab is simulated; no commands are executed or sent to GitHub. */
(() => {
  'use strict';

  const labSteps = [
    {
      title: 'Fork the project',
      description: 'A fork is your own copy of someone else\'s project. On the real GitHub site, you would click the Fork button on a repository.',
      note: 'A fork lets you make changes without editing the original project.',
      type: 'button', button: 'Create practice fork',
      command: 'Fork demo-owner/first-pr-practice',
      output: '✓ A practice copy is now under your account (simulated).'
    },
    {
      title: 'Clone your copy',
      description: 'Cloning downloads your copy of the project to your computer. Type the sample command or use “Fill example.”',
      note: 'For a real project, replace the example URL with the link to your fork.',
      type: 'command', button: 'Run practice command',
      example: 'git clone https://github.com/your-name/first-pr-practice.git',
      validate: text => /^git\s+clone\s+https:\/\/github\.com\/[\w-]+\/[\w.-]+\.git\s*$/i.test(text),
      error: 'Try: git clone https://github.com/your-name/first-pr-practice.git',
      output: '✓ Practice project cloned to your computer (simulated).'
    },
    {
      title: 'Create a branch',
      description: 'A branch keeps your proposed edits separate from the main project. Give your branch a descriptive name.',
      note: 'Use a name that says what you are changing, such as docs/add-helpful-tip.',
      type: 'command', button: 'Run practice command',
      example: 'git switch -c docs/add-helpful-tip',
      validate: text => /^git\s+(?:switch\s+-c|checkout\s+-b)\s+[\w./-]+\s*$/i.test(text),
      error: 'Try: git switch -c docs/add-helpful-tip',
      output: '✓ You are now on your new practice branch.'
    },
    {
      title: 'Edit the README',
      description: 'Contributions do not have to be big. Add one welcoming sentence to a practice README file.',
      note: 'For a real project, open its files in an editor and save your change.',
      type: 'edit', button: 'Save practice edit',
      output: '✓ README.md updated locally (simulated).'
    },
    {
      title: 'Stage the file',
      description: 'Staging tells Git which changed files you want to include in the next commit.',
      note: 'git add README.md stages that specific file.',
      type: 'command', button: 'Run practice command', example: 'git add README.md',
      validate: text => /^git\s+add\s+README\.md\s*$/i.test(text),
      error: 'Try: git add README.md',
      output: '✓ README.md is staged for your next commit.'
    },
    {
      title: 'Commit your change',
      description: 'A commit is a saved snapshot of your work, with a short message describing what changed.',
      note: 'A good commit message describes the change, such as “Add helpful welcome tip.”',
      type: 'command', button: 'Run practice command',
      example: 'git commit -m "Add helpful welcome tip"',
      validate: text => /^git\s+commit\s+-m\s+(['"]).+\1\s*$/i.test(text),
      error: 'Try: git commit -m "Add helpful welcome tip"',
      output: '✓ Commit saved in your practice branch.'
    },
    {
      title: 'Push your branch',
      description: 'Pushing uploads your local branch to the GitHub repository you forked.',
      note: 'origin is the usual nickname for your remote repository.',
      type: 'command', button: 'Run practice command',
      example: 'git push -u origin docs/add-helpful-tip',
      validate: text => /^git\s+push\s+(?:-u\s+)?origin\s+[\w./-]+\s*$/i.test(text),
      error: 'Try: git push -u origin docs/add-helpful-tip',
      output: '✓ Practice branch uploaded (simulated).'
    },
    {
      title: 'Open your pull request',
      description: 'On real GitHub, you would select your branch, click “Compare & pull request,” and explain your change for a project maintainer to review.',
      note: 'A pull request is a request for review—not an automatic change to the original project.',
      type: 'pr', button: 'Open practice pull request',
      output: '✓ Practice pull request opened! A maintainer could now review your proposed change.'
    }
  ];

  const quizQuestions = [
    { question: 'What is a pull request?', options: ['A request to review and merge your proposed changes', 'A request to delete a GitHub account', 'A way to download a website'], answer: 0, explanation: 'A pull request lets maintainers review changes before they decide whether to merge them.' },
    { question: 'What does “fork” mean on GitHub?', options: ['Remove a file forever', 'Create your own copy of a repository', 'Make a new programming language'], answer: 1, explanation: 'Forking creates a copy under your account so you can work on changes safely.' },
    { question: 'Which is a useful first contribution?', options: ['Only building a completely new app', 'Only changing complicated source code', 'Fixing a typo or improving documentation'], answer: 2, explanation: 'Documentation edits, translations, and typo fixes are meaningful contributions too.' },
    { question: 'What is a Git commit?', options: ['A saved snapshot of your changes', 'An email to every contributor', 'A public password'], answer: 0, explanation: 'A commit records a snapshot along with a descriptive message.' },
    { question: 'Before contributing to a real repository, you should…', options: ['Ignore any project instructions', 'Read its README and contribution guidelines', 'Share your password with the maintainer'], answer: 1, explanation: 'Reading a project\'s README and CONTRIBUTING guide helps you follow its rules and conventions.' }
  ];

  const $ = id => document.getElementById(id);
  const storageKey = 'firstpr-buddy-lab-v1';
  const safeLoad = () => { try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch { return {}; } };
  const saved = safeLoad();
  let step = Number.isInteger(saved.step) && saved.step >= 0 && saved.step <= labSteps.length ? saved.step : 0;
  let history = Array.isArray(saved.history) ? saved.history.filter(line => typeof line === 'string').slice(-30) : [];
  let editedText = typeof saved.editedText === 'string' ? saved.editedText.slice(0, 1000) : '';
  let quizIndex = 0, quizScore = 0, quizChecked = false, picked = null;

  function persist() {
    try { localStorage.setItem(storageKey, JSON.stringify({step, history, editedText})); } catch { /* Storage optional. */ }
  }

  function makeEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function renderTerminal() {
    const terminal = $('terminal-output');
    terminal.replaceChildren();
    if (!history.length) {
      terminal.append(makeEl('div', 'terminal-line terminal-muted', 'Welcome! Your practice starts here.'));
      terminal.append(makeEl('div', 'terminal-line terminal-muted', 'No real commands are executed.'));
    } else {
      history.forEach(line => {
        const kind = line.startsWith('$ ') ? 'terminal-command' : line.startsWith('✓') ? 'terminal-success' : 'terminal-muted';
        terminal.append(makeEl('div', `terminal-line ${kind}`, line));
      });
    }
    terminal.append(makeEl('div', 'terminal-line terminal-prompt', 'buddy@learning:~$ ▌'));
    terminal.scrollTop = terminal.scrollHeight;
  }

  function renderLab() {
    const finished = step >= labSteps.length;
    const details = labSteps[Math.min(step, labSteps.length - 1)];
    $('step-count').textContent = finished ? '8 of 8 done' : `${step + 1} of 8`;
    $('progress-fill').style.width = `${(step / labSteps.length) * 100}%`;
    $('progress-bar').setAttribute('aria-valuenow', String(step));
    $('lab-form').hidden = finished;
    $('lab-done').hidden = !finished;
    $('lab-description').hidden = finished;
    $('lab-note').hidden = finished;
    $('lab-title').textContent = finished ? 'Practice completed!' : `Step ${step + 1}: ${details.title}`;
    $('lab-error').hidden = true;
    $('lab-error').textContent = '';
    if (finished) { renderTerminal(); return; }
    $('lab-description').textContent = details.description;
    $('lab-note').textContent = `💡 ${details.note}`;
    $('lab-submit').textContent = details.button + ' →';
    $('lab-hint').hidden = !['command','pr'].includes(details.type);
    const control = $('lab-control');
    control.replaceChildren();
    const wrapper = makeEl('div', 'lab-control');
    if (details.type === 'command') {
      const label = makeEl('label', '', 'Practice command'); label.htmlFor = 'practice-input';
      const input = makeEl('input'); input.id = 'practice-input'; input.type = 'text'; input.autocomplete = 'off'; input.spellcheck = false; input.placeholder = details.example;
      const hint = makeEl('span', 'lab-hint', 'This is practice only. It does not execute a real Git command.');
      wrapper.append(label, input, hint);
    } else if (details.type === 'edit') {
      const label = makeEl('label', '', 'README.md — add your welcome sentence'); label.htmlFor = 'edit-input';
      const textarea = makeEl('textarea'); textarea.id = 'edit-input'; textarea.placeholder = 'Example: Beginners are welcome here! Please ask questions if you need help.'; textarea.maxLength = 1000; textarea.value = editedText;
      wrapper.append(label, textarea);
    } else if (details.type === 'pr') {
      const titleLabel = makeEl('label', '', 'Pull request title'); titleLabel.htmlFor = 'pr-title';
      const title = makeEl('input'); title.id = 'pr-title'; title.placeholder = 'Add a welcoming sentence to README'; title.maxLength = 150;
      const bodyLabel = makeEl('label', '', 'What did you change?'); bodyLabel.htmlFor = 'pr-body'; bodyLabel.style.marginTop = '12px';
      const body = makeEl('textarea'); body.id = 'pr-body'; body.placeholder = 'I added a welcome tip to make the guide easier for beginners.'; body.maxLength = 700;
      wrapper.append(titleLabel, title, bodyLabel, body);
    } else {
      wrapper.append(makeEl('p', 'lab-hint', 'Click below to make your practice fork.'));
    }
    control.append(wrapper);
    renderTerminal();
  }

  $('lab-hint').addEventListener('click', () => {
    if (step >= labSteps.length) return;
    const details = labSteps[step];
    if (details.type === 'command') $('practice-input').value = details.example;
    if (details.type === 'pr') {
      $('pr-title').value = 'Add a welcoming sentence to README';
      $('pr-body').value = 'I added a helpful sentence to make the guide friendlier to first-time contributors.';
    }
    $('lab-error').hidden = true;
  });

  $('lab-form').addEventListener('submit', evt => {
    evt.preventDefault();
    if (step >= labSteps.length) return;
    const details = labSteps[step];
    let command = details.command || '';
    let message = '';
    if (details.type === 'command') {
      command = $('practice-input').value.trim();
      if (!details.validate(command)) message = details.error;
    } else if (details.type === 'edit') {
      const text = $('edit-input').value.trim();
      if (text.length < 12) message = 'Write a sentence of at least 12 characters to help a future learner.';
      else {editedText = text; command = 'edit README.md: ' + editedText.slice(0, 100);}
    } else if (details.type === 'pr') {
      const title = $('pr-title').value.trim();
      const body = $('pr-body').value.trim();
      if (title.length < 8 || body.length < 15) message = 'Add a clear title (8+ characters) and describe your change (15+ characters).';
      else command = 'Open PR: ' + title.slice(0, 100);
    }
    if (message) { $('lab-error').textContent = message; $('lab-error').hidden = false; return; }
    history.push('$ ' + command, details.output);
    history = history.slice(-30);
    step += 1;
    persist();
    renderLab();
  });

  $('restart-btn').addEventListener('click', () => {
    step = 0; history = []; editedText = ''; persist(); renderLab();
    $('practice').scrollIntoView({behavior: 'smooth',block: 'start'});
  });

  function renderQuiz() {
    $('quiz-results').hidden = true;
    $('quiz-form').hidden = false;
    const q = quizQuestions[quizIndex];
    quizChecked = false;
    picked = null;
    $('quiz-counter').textContent = `QUESTION ${quizIndex + 1} / ${quizQuestions.length}`;
    $('quiz-score').textContent = `${quizScore} correct`;
    $('quiz-progress-fill').style.width = `${((quizIndex + 1) / quizQuestions.length) * 100}%`;
    $('quiz-question').textContent = q.question;
    $('quiz-feedback').hidden = true;
    $('quiz-feedback').classList.remove('incorrect');
    $('quiz-action').textContent = 'Check answer →';
    const answers = $('quiz-answers');
    answers.replaceChildren();
    q.options.forEach((opt, index) => {
      const label = makeEl('label', 'answer-option');
      const input = makeEl('input'); input.type = 'radio'; input.name = 'quiz-answer'; input.value = String(index);
      input.addEventListener('change', () => {picked = index;});
      const caption = makeEl('span', '', opt);
      label.append(input, caption);
      answers.append(label);
    });
  }

  $('quiz-form').addEventListener('submit', evt => {
    evt.preventDefault();
    if (!quizChecked) {
      if (picked === null) {
        $('quiz-feedback').textContent = 'Choose an answer first.';
        $('quiz-feedback').hidden = false;
        $('quiz-feedback').classList.add('incorrect');
        return;
      }
      const q = quizQuestions[quizIndex];
      const correct = picked === q.answer;
      if (correct) quizScore += 1;
      $('quiz-score').textContent = `${quizScore} correct`;
      $('quiz-feedback').textContent = (correct ? '✓ Correct! ' : 'Not quite. ') + q.explanation;
      $('quiz-feedback').classList.toggle('incorrect', !correct);
      $('quiz-feedback').hidden = false;
      $('quiz-action').textContent = quizIndex === quizQuestions.length - 1 ? 'See my result →' : 'Next question →';
      $('quiz-answers').querySelectorAll('input').forEach(input => { input.disabled = true; });
      quizChecked = true;
    } else if (quizIndex < quizQuestions.length - 1) {
      quizIndex += 1;
      renderQuiz();
    } else {
      $('quiz-form').hidden = true;
      $('quiz-results').hidden = false;
      $('quiz-counter').textContent = 'QUIZ COMPLETE';
      $('result-title').textContent = `${quizScore} out of ${quizQuestions.length} correct!`;
      $('result-description').textContent = quizScore === quizQuestions.length ? 'Excellent! You understand the essentials. Try a real beginner-friendly contribution when you are ready.' : 'Nice progress! Review the learning cards and practice lab, then try the quiz again.';
    }
  });

  $('retry-quiz').addEventListener('click', () => { quizIndex = 0; quizScore = 0; renderQuiz(); });
  // Real-world GitHub Skills course bridge (self-reported, not GitHub verified).
  const realMissionKey = 'firstpr-buddy-github-skills-v1';
  const missionChecks = [...document.querySelectorAll('[data-mission]')];
  let missionDone = [];
  try {
    const savedMission = JSON.parse(localStorage.getItem(realMissionKey) || '[]');
    if (Array.isArray(savedMission)) missionDone = savedMission.filter(n => Number.isInteger(n) && n >= 0 && n < 4);
  } catch { /* Storage is optional. */ }
  function renderMission() {
    missionChecks.forEach(box => { box.checked = missionDone.includes(Number(box.dataset.mission)); });
    $('mission-count').textContent = `${missionDone.length} / 4`;
    $('mission-fill').style.width = `${missionDone.length * 25}%`;
    $('mission-status').textContent = missionDone.length === 4
      ? 'All four milestones marked complete! These are self-reported, not independently verified.'
      : `${missionDone.length} of four milestones marked. Follow the official GitHub Skills course in another tab.`;
  }
  missionChecks.forEach(box => box.addEventListener('change', () => {
    const n = Number(box.dataset.mission);
    missionDone = box.checked ? [...new Set([...missionDone, n])] : missionDone.filter(x => x !== n);
    missionDone.sort((a,b) => a-b);
    try { localStorage.setItem(realMissionKey, JSON.stringify(missionDone)); } catch { /* Storage optional. */ }
    renderMission();
  }));
  $('reset-mission').addEventListener('click', () => {
    missionDone = [];
    try { localStorage.removeItem(realMissionKey); } catch { /* Storage optional. */ }
    renderMission();
  });

  // Original security teaching interaction. There is no network communication or secret scanning.
  $('security-form').addEventListener('submit', evt => {
    evt.preventDefault();
    const selected = $('security-form').querySelector('input[name="security-option"]:checked');
    const feedback = $('security-feedback');
    feedback.hidden = false;
    if (!selected) {
      feedback.textContent = 'Please select an option before checking your answer.';
      feedback.classList.add('is-wrong');
    } else if (selected.value === 'safe') {
      feedback.textContent = '✓ Correct! Reading secrets from environment variables avoids committing literal keys. Keep your .env file out of Git, too.';
      feedback.classList.remove('is-wrong');
    } else {
      feedback.textContent = 'Not quite. Hard-coded keys may be exposed in a public commit. Choose the option that reads from an environment variable.';
      feedback.classList.add('is-wrong');
    }
  });
  renderMission();
  renderLab();
  renderQuiz();
})();
