import { ElementType, Suspense } from "react";
import { Spinner } from "~shared/ui/spinner";

export function Loadable(Component: ElementType) {
  return function fn(props: any) {
    return (
      <Suspense
        fallback={
          <div className={"spinner_layout"}>
            <Spinner />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };
}
