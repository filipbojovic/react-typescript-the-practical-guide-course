import { useRef, type FormEvent } from "react"; // annotate it with type so it won't be included during prep for prod

type NewGoalsProps = {
  onAddGoal: (goal: string, summary: string) => void;
};

export default function NewGoal({ onAddGoal }: NewGoalsProps) {
  const goal = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLInputElement>(null);

  // FormEvent is a generic type, but to be more specific we can provide for which
  // element exactly we are receiving event FormEvent<HTMLFormElement>
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    // approach 1 to extract values
    // built in browser structure which will get all the data form provided form element
    // for this we have assign the 'name' attribute to our inputs
    // new FormData(event.currentTarget);

    //approach 2 with refs
    const enteredGoal = goal.current!.value;
    const enteredSummary = summary.current!.value;

    // clear the form
    event.currentTarget.reset();
    onAddGoal(enteredGoal, enteredSummary);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your goal</label>
        <input id="goal" type="text" ref={goal} />
      </p>
      <p>
        <label htmlFor="summary">Short summary</label>
        <input id="summary" type="text" ref={summary} />
      </p>
      <p>
        <button>Add Goal</button>
      </p>
    </form>
  );
}
