import { makeObservable, observable, action } from 'mobx';

import { s_viewport } from '@loftyshaky/shared';
import { d_side_panel, s_infinite_scroll } from 'content_script/internal';

export class Page {
    private static i0: Page;

    public static i(): Page {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            current: observable,
            total: observable,
            set_current: action,
            set_total: action,
        });
    }

    private offset: number = 400;
    public current: number = 1;
    public total: number = 1;

    public set_current = (): Promise<void> =>
        err_async(async () => {
            let rendering_iframe_final: boolean = false;

            const current_iframe_i: number = s_infinite_scroll.Iframe.i().iframes.findIndex(
                (el: HTMLIFrameElement): boolean =>
                    err(() => {
                        const page_height: number = s_viewport.Main.i().get_dim({
                            dim: 'height',
                        });
                        const rect = el.getBoundingClientRect();
                        const rendering_iframe: boolean = rect.top > 50000;

                        if (rendering_iframe) {
                            rendering_iframe_final = rendering_iframe;
                        }

                        return (
                            !rendering_iframe &&
                            rect.top <= page_height - this.offset &&
                            rect.bottom >= page_height - this.offset
                        );
                    }, 'ges_1106'),
            );

            if (!rendering_iframe_final) {
                this.current = current_iframe_i === -1 ? 1 : current_iframe_i + 2;
            }

            if (
                d_side_panel.RelatedSearches.i().last_related_searches_position !==
                d_side_panel.Scroll.i().get_current_position()
            ) {
                d_side_panel.RelatedSearches.i().reset_position();
            }
        }, 'ges_1107');

    public set_total = (): void =>
        err(() => {
            const iframe_count: number = s_infinite_scroll.Iframe.i().iframes.length;

            this.total = iframe_count + 1;
        }, 'ges_1108');
}
