import _ from 'lodash';

import { t } from '@loftyshaky/shared';
import { d_color } from '@loftyshaky/shared/inputs';
import { i_data } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public defaults: i_data.Settings | t.EmptyRecord = {};

    public init_defaults = (): void =>
        err(() => {
            this.defaults = {
                current_section: 'all',
                options_page_theme: 'light',
                transition_duration: 200,
                show_color_help: true,
                enable_cut_features: false,
                colors: d_color.Color.i().default_colors,
                side_panel_position: 'right',
                keyword_color: 2,
                spinner_color: 15,
                enable_infinite_scrolling: true,
                show_enable_btn: true,
                show_jump_to_related_searches_btn: true,
                show_page_indicator: true,
                show_page_separators: true,
                show_favicons: true,
                show_server_locations: true,
                show_scroll_to_top_btn: true,
                always_show_img_action_bar: true,
                show_view_img_btn: true,
                show_search_by_img_btn: true,
                show_download_img_btn: true,
                show_save_img_as_btn: true,
                img_downloads_dir: '',
                show_copy_img_btn: true,
                show_copy_img_url_btn: true,
                link_min_saturation: '0.5',
                keyword_max_saturation: '0.3',
                favicon_providers: {
                    google: true,
                    yandex: true,
                    duckduckgo: true,
                },
                infinite_scrolling_enabled: true,
                last_ip_to_country_csv_char_count: 0,
            };
        }, 'ges_1002');

    public update_settings = ({ settings }: { settings?: i_data.Settings } = {}): Promise<void> =>
        err_async(async () => {
            const settings_final: i_data.Settings = n(settings)
                ? settings
                : (this.defaults as i_data.Settings);

            await ext.storage_set(settings_final);
        }, 'ges_1003');

    public update_settings_debounce = _.debounce(
        (settings: i_data.Settings, rerun_actions: boolean) =>
            err_async(async () => {
                await this.update_settings({ settings });

                if (n(rerun_actions)) {
                    ext.send_msg_to_all_tabs({ msg: 'rerun_actions' });
                }
            }, 'ges_1177'),
        500,
    );

    public set_from_storage = (): Promise<void> =>
        err_async(async () => {
            const settings: i_data.Settings = await ext.storage_get();

            if (_.isEmpty(settings)) {
                this.update_settings();
            }
        }, 'ges_1004');
}
