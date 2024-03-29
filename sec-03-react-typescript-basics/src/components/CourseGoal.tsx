import { PropsWithChildren } from "react";

// first approach to accept typed props
// interface CourseGoalProps {
//   title: string;
//   children?: ReactNode;
// }

// the second approach
type CourseGoalProps = PropsWithChildren<{
  id: number;
  title: string;
  onDelete: (id: number) => void;
}>;

export default function CourseGoal({ id, title, children, onDelete }: CourseGoalProps) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button onClick={(_) => onDelete(id)}>Delete</button>
    </article>
  );
}

// the third approach
// const CourseGoal: FC<CourseGoalProps> = ({ title, children }) => {
//   return (
//     <article>
//       <div>
//         <h2>{title}</h2>
//         {children}
//       </div>
//       <button>Delete</button>
//     </article>
//   );
// };

// export default CourseGoal;
