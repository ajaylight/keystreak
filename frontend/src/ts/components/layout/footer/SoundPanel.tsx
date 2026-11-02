import { createSignal, For, JSXElement, onCleanup, onMount, Show } from "solid-js";

import { getOptionLabel, getVisibleOptions } from "../../../config/metadata";
import { setConfig } from "../../../config/setters";
import { getConfig } from "../../../config/store";
import {
  playClick,
  playTimeWarning,
  previewClick,
  previewError,
} from "../../../controllers/sound-controller";
import { Button } from "../../common/Button";
import { Fa } from "../../common/Fa";
import { Slider } from "../../common/Slider";

export function SoundPanel(): JSXElement {
  const [isOpen, setIsOpen] = createSignal(false);
  let containerRef: HTMLDivElement | undefined;

  onMount(() => {
    const handlePointerDown = (event: PointerEvent): void => {
      if (
        isOpen() &&
        containerRef &&
        !containerRef.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    onCleanup(() => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    });
  });

  return (
    <div ref={(el) => (containerRef = el)} class="relative">
      <button
        type="button"
        class="textButton"
        aria-label="Sound settings"
        aria-haspopup="dialog"
        aria-expanded={isOpen()}
        data-balloon-pos="left"
        onClick={() => setIsOpen((open) => !open)}
      >
        <Fa icon="fa-volume-up" fixedWidth />
      </button>

      <Show when={isOpen()}>
        <div
          role="dialog"
          aria-label="Sound settings"
          class="absolute right-0 bottom-full z-50 mb-3 grid max-h-[min(70vh,38rem)] w-[min(28rem,calc(100vw-2rem))] gap-4 overflow-y-auto rounded-double border border-sub bg-bg p-4 text-left text-xs text-text shadow-2xl"
        >
          <div class="flex items-center justify-between">
            <div class="text-base font-bold">sound</div>
            <button
              type="button"
              class="textButton"
              aria-label="Close sound settings"
              onClick={() => setIsOpen(false)}
            >
              <Fa icon="fa-times" />
            </button>
          </div>

          <section class="grid gap-2">
            <div class="flex items-center justify-between">
              <div class="font-bold">sound volume</div>
              <div class="text-sub">
                {Math.round(getConfig.soundVolume * 100)}%
              </div>
            </div>
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={getConfig.soundVolume}
              text={(value) => value.toFixed(1)}
              onChange={(value) => {
                if (value === getConfig.soundVolume) return;
                if (getConfig.playSoundOnClick === "off") {
                  void previewClick("1");
                } else {
                  void playClick();
                }
                setConfig("soundVolume", value);
              }}
            />
          </section>

          <section class="grid gap-2">
            <div class="font-bold">play sound on click</div>
            <div class="grid max-h-36 grid-cols-3 gap-1.5 overflow-y-auto pr-1">
              <For each={getVisibleOptions("playSoundOnClick") ?? []}>
                {(option) => (
                  <Button
                    variant="button"
                    active={getConfig.playSoundOnClick === option}
                    class="min-w-0 px-2 py-1.5 text-xs"
                    onClick={() => {
                      if (getConfig.playSoundOnClick === option) return;
                      if (option !== "off") void previewClick(option);
                      setConfig("playSoundOnClick", option);
                    }}
                  >
                    {getOptionLabel("playSoundOnClick", option)}
                  </Button>
                )}
              </For>
            </div>
          </section>

          <section class="grid gap-2">
            <div class="font-bold">play sound on error</div>
            <div class="grid grid-cols-3 gap-1.5">
              <For each={getVisibleOptions("playSoundOnError") ?? []}>
                {(option) => (
                  <Button
                    variant="button"
                    active={getConfig.playSoundOnError === option}
                    class="min-w-0 px-2 py-1.5 text-xs"
                    onClick={() => {
                      if (getConfig.playSoundOnError === option) return;
                      if (option !== "off") void previewError(option);
                      setConfig("playSoundOnError", option);
                    }}
                  >
                    {getOptionLabel("playSoundOnError", option)}
                  </Button>
                )}
              </For>
            </div>
          </section>

          <section class="grid gap-2">
            <div class="font-bold">play time warning</div>
            <div class="grid grid-cols-3 gap-1.5">
              <For each={getVisibleOptions("playTimeWarning") ?? []}>
                {(option) => (
                  <Button
                    variant="button"
                    active={getConfig.playTimeWarning === option}
                    class="min-w-0 px-2 py-1.5 text-xs"
                    onClick={() => {
                      if (getConfig.playTimeWarning === option) return;
                      if (option !== "off") void playTimeWarning();
                      setConfig("playTimeWarning", option);
                    }}
                  >
                    {getOptionLabel("playTimeWarning", option)}
                  </Button>
                )}
              </For>
            </div>
          </section>
        </div>
      </Show>
    </div>
  );
}
