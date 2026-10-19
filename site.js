'use strict';
const steps = {
  focus: `<div class="demo-top"><span>MATCHBOOK / PRACTICE NOTES</span><span>01 of 04</span></div><div class="demo-kicker">Today's focus</div><div class="demo-title">Check the wave.<br>Then take the fight.</div><div class="demo-line"><b>PLAYING</b><span>Bot lane</span><span class="demo-tag">Ashe</span></div><div class="demo-line"><b>THE CUE</b><span>Before I walk into river</span></div><div class="demo-note">A good session can start with one better decision.</div>`,
  flag: `<div class="demo-top"><span>MATCHBOOK / MOMENTS TO REVISIT</span><span>02 of 04</span></div><div class="demo-kicker">One hotkey. Back to the game.</div><div class="demo-title">That fight.<br>Keep the timestamp.</div><div class="flag-times"><span>08:42</span><span class="selected">14:08 ⚑</span><span>23:16</span></div><div class="timeline" aria-hidden="true"><span></span><span></span><span></span></div><div class="demo-line"><b>HOTKEY</b><span>⌘J · configurable in Settings</span></div>`,
  review: `<div class="demo-top"><span>MATCHBOOK / THE TAKEAWAY</span><span>03 of 04</span></div><div class="demo-kicker">14:08 · The river fight</div><div class="demo-title">The mistake was<br>before the fight.</div><div class="demo-tag">Wave management</div><div class="demo-note">I followed the ping with a wave under our tower. Clear it first, then decide whether to move.</div><p class="demo-foot">One moment, one useful thing to remember.</p>`,
  carry: `<div class="demo-top"><span>MATCHBOOK / NEXT SESSION</span><span>04 of 04</span></div><div class="demo-kicker">Bring the takeaway forward</div><div class="demo-title">Same champion.<br>A clearer intention.</div><div class="demo-line"><b>FOCUS</b><span>Look at the wave before rotating.</span></div><div class="demo-note">Use the last session's lesson to choose what to practice next.</div><p class="demo-foot">Improvement is something you can come back to.</p>`
};
const stepButtons = [...document.querySelectorAll('[data-step]')];
function chooseStep(button, focus = false) {
  const panel = document.getElementById('practice-panel');
  if (!panel || !steps[button.dataset.step]) return;
  stepButtons.forEach(item => { item.setAttribute('aria-selected', String(item === button)); item.tabIndex = item === button ? 0 : -1; });
  panel.innerHTML = steps[button.dataset.step];
  panel.setAttribute('aria-labelledby', button.id);
  if (focus) button.focus();
}
stepButtons.forEach((button, index) => {
  button.addEventListener('click', () => chooseStep(button));
  button.addEventListener('keydown', event => {
    let target;
    if (['ArrowRight','ArrowDown'].includes(event.key)) target=(index+1)%stepButtons.length;
    if (['ArrowLeft','ArrowUp'].includes(event.key)) target=(index-1+stepButtons.length)%stepButtons.length;
    if (event.key==='Home') target=0;
    if (event.key==='End') target=stepButtons.length-1;
    if (target !== undefined) { event.preventDefault(); chooseStep(stepButtons[target], true); }
  });
});
