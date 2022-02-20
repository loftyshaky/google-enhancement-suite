import React, { FunctionComponent } from 'react';
import { render } from 'react-dom';

import { c_crash_handler } from '@loftyshaky/shared';
import { s_suffix } from 'shared/internal';
import {
    c_icons,
    c_img_action_bar,
    c_infinite_scroll,
    d_icons,
    s_el_parser,
    s_infinite_scroll,
    s_location,
    s_roots,
    s_theme,
    i_img_action_bar,
} from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    private component: Record<string, FunctionComponent<any>> = {};

    public init_component = (): void =>
        err(() => {
            this.component = {
                icons: c_icons.Icons,
                separator: c_infinite_scroll.Separator,
                img_action_bar: c_img_action_bar.Body,
            };
        }, 'ges_1089');

    public init = ({ name, start = 0 }: { name: string; start?: number }): void =>
        err(() => {
            const { img_viewer } = s_el_parser.Main.i();

            if (name === 'icons') {
                s_roots.Position.i().position_title_el();

                if (s_el_parser.Main.i().title_els.length === 0) {
                    const remove_icons = ({ icon_roots }: { icon_roots: NodeList }): void =>
                        err(() => {
                            x.remove(icon_roots);
                        }, 'ges_1090');

                    s_infinite_scroll.Iframe.i().iframes.forEach((iframe: HTMLIFrameElement) =>
                        err(() => {
                            if (n(iframe.contentDocument)) {
                                const icon_roots = sab<HTMLDivElement>(
                                    iframe.contentDocument,
                                    `.${new s_suffix.Main(name).result}`,
                                );

                                if (n(icon_roots)) {
                                    remove_icons({ icon_roots });
                                }
                            }
                        }, 'ges_1091'),
                    );

                    const icon_roots = sa<HTMLDivElement>(`.${new s_suffix.Main(name).result}`);

                    if (n(icon_roots)) {
                        remove_icons({ icon_roots });
                    }
                } else {
                    s_el_parser.Main.i().title_els.forEach((title_el, i): void =>
                        err(() => {
                            if (i >= start) {
                                let icons_el: HTMLElement | undefined;

                                d_icons.Main.i().generate_urls({ i });

                                if (n(title_el.parentElement)) {
                                    icons_el = sb(
                                        title_el.parentElement,
                                        `.${new s_suffix.Main(name).result}`,
                                    );
                                }

                                if (!n(icons_el)) {
                                    this.append_root({
                                        name,
                                        parent: title_el,
                                        i,
                                        append_f_name: s_location.Main.i().is_news_page
                                            ? 'as_first'
                                            : 'before',
                                    });
                                }
                            }
                        }, 'ges_1092'),
                    );
                }
            } else if (name === 'img_action_bar') {
                const append = ({
                    append_only_to_preview_img_viewers = false,
                }: {
                    append_only_to_preview_img_viewers?: boolean;
                } = {}): void =>
                    err(() => {
                        if (n(img_viewer) && !append_only_to_preview_img_viewers) {
                            this.append_root({
                                name,
                                parent: img_viewer,
                                i: 0,
                                append_f_name: 'after',
                                img_viewer_i: 'main',
                            });
                        }

                        s_el_parser.Main.i().preview_img_viewer_ws.forEach(
                            (preview_img_viewer_ws: HTMLElement, i: number) => {
                                const preview_img_url: string | undefined =
                                    s_el_parser.Main.i().get_preview_img_url({
                                        img_viewer_i: i,
                                    });

                                if (n(preview_img_url)) {
                                    this.append_root({
                                        name,
                                        parent: preview_img_viewer_ws,
                                        i: 0,
                                        append_f_name: 'append',
                                        img_viewer_i: i,
                                    });
                                }
                            },
                        );

                        s_theme.Main.i().adapt_panel_to_dark_theme();
                    }, 'ges_1093');

                if (n(img_viewer)) {
                    const next_el: Element | null = img_viewer.nextElementSibling;

                    if (n(next_el)) {
                        const next_el_is_img_action_bar: boolean = x.matches(
                            next_el as HTMLElement,
                            `.${new s_suffix.Main(name).result}`,
                        );

                        if (!next_el_is_img_action_bar) {
                            append();
                        }
                    } else {
                        append();
                    }
                }

                append({ append_only_to_preview_img_viewers: true });
            }
        }, 'ges_1094');

    public append_root = ({
        name,
        i,
        parent,
        append_f_name,
        img_viewer_i,
    }: {
        name: string;
        i: number;
        parent: HTMLElement;
        append_f_name: 'append' | 'as_first' | 'before' | 'after';
        img_viewer_i?: i_img_action_bar.ImgViewerI;
    }): Promise<void> =>
        new Promise((resolve) => {
            err(() => {
                const root_cls = new s_suffix.Main(name).result;

                if (!sb(parent, `.${root_cls}`)) {
                    const root: HTMLDivElement = x.create('div', new s_suffix.Main(name).result);

                    if (name === 'icons') {
                        if (s_location.Main.i().is_news_page) {
                            x.add_cls(root, new s_suffix.Main('news').result);
                        }
                    }

                    x[append_f_name](
                        !s_location.Main.i().is_news_page &&
                            name === 'icons' &&
                            n(parent.firstChild)
                            ? parent.firstChild
                            : parent,
                        root,
                    );

                    root.attachShadow({ mode: 'open' });

                    const content = x.create('div', 'content');
                    x.append(root.shadowRoot, content);

                    if (n(root.shadowRoot)) {
                        const css = x.css(name, root.shadowRoot);

                        if (n(css)) {
                            x.bind(css, 'load', (): void =>
                                err(() => {
                                    const Component: FunctionComponent<any> = this.component[name];

                                    render(
                                        <c_crash_handler.Body>
                                            <Component i={i} img_viewer_i={img_viewer_i} />
                                        </c_crash_handler.Body>,
                                        content,
                                        resolve,
                                    );
                                }, 'ges_1095'),
                            );
                        }
                    }
                }
            }, 'ges_1096');
        });

    public apply_root_parent_cls_to_title_els = (): void =>
        err(() => {
            s_el_parser.Main.i().title_els.forEach((title_el): void =>
                err(() => {
                    this.apply_root_parent_cls_to_title_el({ title_el });
                }, 'ges_1097'),
            );
        }, 'ges_1098');

    public apply_root_parent_cls_to_title_el = ({ title_el }: { title_el: HTMLElement }): void =>
        err(() => {
            x.add_cls(title_el, new s_suffix.Main('root_parent').result);

            if (s_location.Main.i().is_news_page) {
                x.add_cls(title_el, new s_suffix.Main('news').result);
            }
        }, 'ges_1099');
}
