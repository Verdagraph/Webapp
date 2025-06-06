import type { WithElementRef } from 'bits-ui';
import type { EmblaCarouselSvelteType } from 'embla-carousel-svelte';
import type emblaCarouselSvelte from 'embla-carousel-svelte';
import type { HTMLAttributes } from 'svelte/elements';
export type CarouselAPI = NonNullable<NonNullable<EmblaCarouselSvelteType['$$_attributes']>['on:emblaInit']> extends (evt: CustomEvent<infer CarouselAPI>) => void ? CarouselAPI : never;
type EmblaCarouselConfig = NonNullable<Parameters<typeof emblaCarouselSvelte>[1]>;
export type CarouselOptions = EmblaCarouselConfig['options'];
export type CarouselPlugins = EmblaCarouselConfig['plugins'];
export type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugins;
    setApi?: (api: CarouselAPI | undefined) => void;
    orientation?: 'horizontal' | 'vertical';
} & WithElementRef<HTMLAttributes<HTMLDivElement>>;
export type EmblaContext = {
    api: CarouselAPI | undefined;
    orientation: 'horizontal' | 'vertical';
    scrollNext: () => void;
    scrollPrev: () => void;
    canScrollNext: boolean;
    canScrollPrev: boolean;
    handleKeyDown: (e: KeyboardEvent) => void;
    options: CarouselOptions;
    plugins: CarouselPlugins;
    onInit: (e: CustomEvent<CarouselAPI>) => void;
    scrollTo: (index: number, jump?: boolean) => void;
    scrollSnaps: number[];
    selectedIndex: number;
};
export declare function setEmblaContext(config: EmblaContext): EmblaContext;
export declare function getEmblaContext(name?: string): EmblaContext;
export {};
//# sourceMappingURL=context.d.ts.map