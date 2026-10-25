import { Link } from "@tanstack/solid-router";
import { JSXElement } from "solid-js";

import { restartTestEvent } from "../../../events/test";
import { getRoutePage } from "../../../states/router";
import { getFocus } from "../../../states/test";
import { cn } from "../../../utils/cn";

export function Logo(): JSXElement {
  return (
    <Link
      to="/"
      class="-m-2 flex h-8 w-max items-center rounded-[0.8rem] p-2 focus-visible:ring-2 focus-visible:ring-main focus-visible:outline-none"
      aria-label="ComboKeys Home"
      data-ui-element="logo"
      onClick={() => {
        if (getRoutePage() === "test") restartTestEvent.dispatch();
      }}
    >
      <img
        src="/images/combokeys-mark.png"
        alt=""
        class="h-8 w-8 shrink-0 object-contain sm:hidden"
        draggable={false}
      />
      <img
        src="/images/combokeys-logo.png"
        alt=""
        class={cn(
          "hidden h-8 w-auto max-w-[230px] object-contain transition-opacity duration-150 sm:block",
          {
            "opacity-60": getFocus(),
          },
        )}
        draggable={false}
        data-ui-element="logoImage"
      />
      <span class="sr-only" data-ui-element="logoText">
        ComboKeys
      </span>
    </Link>
  );
}
