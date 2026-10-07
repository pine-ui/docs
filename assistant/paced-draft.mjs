// Buffer network bursts and reveal about 150 characters per second.
export function pacedDraft(
  onText,
  { schedule = setInterval, unschedule = clearInterval } = {},
) {
  let text = "",
    pending = [],
    timer,
    done;
  const stopTimer = () => {
    if (timer !== undefined) unschedule(timer);
    timer = undefined;
  };
  const start = () => {
    if (timer !== undefined || !pending.length) return;
    timer = schedule(() => {
      text += pending.splice(0, 6).join("");
      onText(text);
      if (!pending.length) {
        stopTimer();
        done?.();
        done = undefined;
      }
    }, 40);
  };
  return {
    append(delta) {
      pending.push(...Array.from(delta));
      start();
    },
    finish(answer) {
      // The final validated answer takes precedence over the provisional draft.
      if (!answer.startsWith(text)) {
        text = "";
        onText(text);
      }
      pending = Array.from(answer.slice(text.length));
      if (!pending.length) {
        stopTimer();
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        done = resolve;
        start();
      });
    },
    cancel() {
      stopTimer();
      pending = [];
      done?.();
      done = undefined;
    },
  };
}
