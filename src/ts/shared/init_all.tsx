import React from 'react';
import ReactDOM from 'react-dom/client';

import '@loftyshaky/shared/ext';
import {
    c_crash_handler,
    c_error,
    c_loading_screen,
    d_loading_screen,
    s_no_tr,
    d_settings,
    s_tab_index,
    s_theme as s_theme_shared,
} from '@loftyshaky/shared';
import { d_inputs, i_inputs } from '@loftyshaky/shared/inputs';
import { s_css_vars, s_suffix } from 'shared/internal';

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
declare let __webpack_public_path__: string;

export class InitAll {
    private static i0: InitAll;

    public static i(): InitAll {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    private settings_root: HTMLDivElement | undefined = undefined;
    private spinner_root: ShadowRoot | undefined = undefined;
    private load_end_msg_root: ShadowRoot | undefined = undefined;
    private side_panel_root: ShadowRoot | undefined = undefined;

    public init = (): Promise<void> =>
        new Promise((reslove) => {
            err_async(async () => {
                const on_loading_screen_render = (): void =>
                    err(() => {
                        const loading_screen_root_el = s<HTMLDivElement>(
                            `.${new s_suffix.Main('loading_screen').result}`,
                        );

                        if (n(loading_screen_root_el) && n(loading_screen_root_el.shadowRoot)) {
                            const loading_screen_css = x.css(
                                'loading_screen',
                                loading_screen_root_el.shadowRoot,
                            );

                            if (n(loading_screen_css)) {
                                x.bind(loading_screen_css, 'load', (): void =>
                                    err(() => {
                                        d_loading_screen.Main.i().show();

                                        reslove();
                                    }, 'ges_1158'),
                                );
                            }
                        }
                    }, 'ges_1159');

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                __webpack_public_path__ = we.runtime.getURL('');

                await d_settings.Main.i().set_from_storage();

                if (page === 'settings') {
                    this.set_page_title();
                } else if (page === 'content_script') {
                    const { s_icons } = await import('content_script/internal');

                    s_icons.Main.i().show_or_hide_native_favicons();
                }

                s_css_vars.Main.i().set();

                const error_root: ShadowRoot = this.create_root({ prefix: 'error' }) as ShadowRoot;
                let loading_screen_root: ShadowRoot;

                if (page === 'settings') {
                    loading_screen_root = this.create_root({
                        prefix: 'loading_screen',
                    }) as ShadowRoot;
                    this.settings_root = this.create_root({
                        prefix: 'settings',
                        shadow_root: false,
                    }) as HTMLDivElement;
                } else if (page === 'content_script') {
                    x.css('font_face', document.head, new s_suffix.Main('font_face_link').result);

                    this.spinner_root = this.create_root({ prefix: 'spinner' }) as ShadowRoot;
                    this.load_end_msg_root = this.create_root({
                        prefix: 'load_end_msg',
                    }) as ShadowRoot;
                    this.side_panel_root = this.create_root({ prefix: 'side_panel' }) as ShadowRoot;
                }

                ReactDOM.createRoot(error_root).render(
                    <c_error.Body
                        app_id={s_suffix.app_id}
                        on_render={(): void =>
                            err(() => {
                                if (page === 'settings') {
                                    ReactDOM.createRoot(loading_screen_root).render(
                                        <c_crash_handler.Body>
                                            <c_loading_screen.Body
                                                app_id={s_suffix.app_id}
                                                on_render={(): void => {
                                                    on_loading_screen_render();
                                                }}
                                            />
                                        </c_crash_handler.Body>,
                                    );
                                } else {
                                    reslove();
                                }
                            }, 'ges_1206')
                        }
                    />,
                );
            }, 'ges_1160');
        });

    private create_root = ({
        prefix,
        shadow_root = true,
    }: {
        prefix: string;
        shadow_root?: boolean;
    }): HTMLDivElement | ShadowRoot | undefined =>
        err(() => {
            const root = x.create(
                'div',
                x.cls([new s_suffix.Main('root').result, new s_suffix.Main(prefix).result]),
            );

            x.append(document.body, root);

            if (shadow_root) {
                return root.attachShadow({ mode: 'open' });
            }

            return root;
        }, 'ges_1161');

    private set_page_title = (): void =>
        err(() => {
            const title_el = s<HTMLTitleElement>('title');

            if (n(title_el)) {
                title_el.textContent = ext.msg(`${page}_title_text`);
            }
        }, 'ges_1162');

    public render_settings = (): Promise<void> =>
        err_async(async () => {
            const { Body } = await import('settings/components/body');
            const on_css_load = (): Promise<void> =>
                err_async(async () => {
                    const { d_sections } = await import('settings/internal');

                    d_inputs.InputWidth.i().calculate_for_all_sections({
                        sections: d_sections.Main.i().sections as i_inputs.Sections,
                    });
                    d_inputs.InputWidth.i().set_max_width();

                    d_loading_screen.Main.i().hide({ app_id: s_suffix.app_id });

                    s_tab_index.Main.i().bind_set_input_type_f();
                }, 'ges_1148');

            if (n(this.settings_root)) {
                ReactDOM.createRoot(this.settings_root).render(
                    <c_crash_handler.Body>
                        <Body
                            on_render={(): void =>
                                err(() => {
                                    const settings_css = x.css('settings_css', document.head);

                                    s_theme_shared.Main.i().set({
                                        name: data.settings.options_page_theme,
                                    });

                                    if (n(settings_css)) {
                                        x.bind(settings_css, 'load', on_css_load);
                                    }
                                }, 'ges_1149')
                            }
                        />
                    </c_crash_handler.Body>,
                );
            }
        }, 'ges_1150');

    public render_spinner = (): Promise<void> =>
        err_async(async () => {
            const { c_infinite_scroll } = await import('content_script/internal');

            if (n(this.spinner_root)) {
                ReactDOM.createRoot(this.spinner_root).render(
                    <c_crash_handler.Body>
                        <c_infinite_scroll.Spinner
                            on_render={(): void =>
                                err(() => {
                                    x.css('spinner', this.spinner_root);
                                }, 'ges_1151')
                            }
                        />
                    </c_crash_handler.Body>,
                );
            }
        }, 'ges_1152');

    public render_last_end_msg = (): Promise<void> =>
        err_async(async () => {
            const { c_infinite_scroll } = await import('content_script/internal');

            if (n(this.load_end_msg_root)) {
                ReactDOM.createRoot(this.load_end_msg_root).render(
                    <c_crash_handler.Body>
                        <c_infinite_scroll.LoadEndMsg
                            on_render={(): void =>
                                err(() => {
                                    x.css('load_end_msg', this.load_end_msg_root);
                                }, 'ges_1153')
                            }
                        />
                    </c_crash_handler.Body>,
                );
            }
        }, 'ges_1154');

    public render_side_panel = (): Promise<void> =>
        err_async(async () => {
            const { c_side_panel, s_location, s_theme } = await import('content_script/internal');

            if (n(this.side_panel_root) && s_location.Main.i().is_search_results) {
                ReactDOM.createRoot(this.side_panel_root).render(
                    <c_crash_handler.Body>
                        <c_side_panel.Body
                            on_render={(): void =>
                                err(() => {
                                    s_no_tr.Main.i().enable({ el: this.side_panel_root });

                                    s_theme.Main.i().adapt_panel_to_dark_theme();
                                    const side_panel_css = x.css(
                                        'side_panel',
                                        this.side_panel_root,
                                    );

                                    if (n(side_panel_css)) {
                                        x.bind(side_panel_css, 'load', (): void =>
                                            err(() => {
                                                s_no_tr.Main.i().disable({
                                                    el: this.side_panel_root,
                                                });
                                            }, 'ges_1155'),
                                        );
                                    }
                                }, 'ges_1156')
                            }
                        />
                    </c_crash_handler.Body>,
                );
            }
        }, 'ges_1157');
}
