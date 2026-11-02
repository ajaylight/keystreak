import { JSXElement } from "solid-js";

import { AnimatedModal } from "../common/AnimatedModal";
import { Button } from "../common/Button";

export function ContactModal(): JSXElement {
  return (
    <AnimatedModal id="Contact" modalClass="max-w-4xl" title="Contact ComboKeys">
      <div>
        For questions, feedback, suggestions, or bug reports, visit the
        ComboKeys GitHub repository. An official support email can be added
        here when one is available.
      </div>
      <div class="mt-4">
        <Button
          variant="button"
          href="https://github.com/ajaylight/keystreak"
          text="Open ComboKeys on GitHub"
          class="gap-4 p-4 text-lg"
          fa={{
            icon: "fa-github",
            fixedWidth: true,
          }}
        />
      </div>
    </AnimatedModal>
  );
}
