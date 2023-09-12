import { ElementType, Suspense } from "react";
import { Spinner } from "../spinner/ui/Spinner.tsx";

export function Loadable(Component: ElementType) {
  return function fn(props: any) {
    return (
      <Suspense fallback={<Spinner />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
