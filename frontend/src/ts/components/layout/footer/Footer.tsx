import { JSXElement, Show } from "solid-js";

import { getIsScreenshotting } from "../../../states/core";
import { showModal } from "../../../states/modals";
import { getFocus } from "../../../states/test";
import { getRoutePage } from "../../../states/router";
import { cn } from "../../../utils/cn";
import { Button } from "../../common/Button";
import { isLoadingShown } from "../../core/PageSwitcher";
import { SoundPanel } from "./SoundPanel";
import { ThemeIndicator } from "./ThemeIndicator";
import { VersionButton } from "./VersionButton";

export function Footer(): JSXElement {
  return (
    <footer
      class={cn("relative text-xs text-sub", {
        "opacity-0": getIsScreenshotting(),
      })}
      inert={isLoadingShown()}
    >
      <div
        class={cn("-m-2 flex justify-between gap-8 transition-opacity", {
          "opacity-0": getFocus(),
        })}
      >
        <div class="grid grid-cols-1 justify-items-start xs:grid-cols-2 sm:grid-cols-4 lg:flex">
          <Button
            variant="text"
            text="contact"
            fa={{
              icon: "fa-envelope",
              fixedWidth: true,
            }}
            onClick={() => showModal("Contact")}
          />
          <Button
            variant="text"
            text="github"
            fa={{
              icon: "fa-code",
              fixedWidth: true,
            }}
            href="https://github.com/ajaylight/keystreak"
          />
          <Button
            variant="text"
            text="terms"
            fa={{
              icon: "fa-file-contract",
              fixedWidth: true,
            }}
            href="/terms-of-service.html"
          />
          <Button
            href="/privacy-policy.html"
            variant="text"
            text="privacy"
            fa={{
              icon: "fa-lock",
              fixedWidth: true,
            }}
          />
        </div>
        <div class="flex flex-col items-end text-right lg:flex-row">
          <div class="flex items-center gap-2">
            <Show when={getRoutePage() === "test"}>
              <SoundPanel />
            </Show>
            <ThemeIndicator />
          </div>
          <VersionButton />
        </div>
      </div>
    </footer>
  );
}
