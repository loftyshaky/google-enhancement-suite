import { s_keep_alive, s_tab_index } from '@loftyshaky/shared';
import { s_suffix } from 'shared/internal';
import {
    d_img_action_bar,
    s_roots,
    d_side_panel,
    s_actions,
    s_infinite_scroll,
    s_text_dir,
} from 'content_script/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        s_keep_alive.Tabs.i().add_on_connect_listener();
        x.insert_invisible_chars_in_title();
        s_tab_index.Main.i().bind_set_input_type_f({
            parent: document.body,
            app_id: s_suffix.app_id,
        });

        await s_actions.Main.i().run_initial_actions();
        d_img_action_bar.Btns.i().init_btns();
        d_img_action_bar.Btns.i().init_component();
        s_roots.Main.i().init_component();
        s_infinite_scroll.FooterEls.i().append_to_footer();
        s_text_dir.Main.i().get();
        s_infinite_scroll.Scroll.i().observe();

        x.bind(self, 'scroll', s_infinite_scroll.Scroll.i().observe);
        x.bind(self, 'scroll', d_side_panel.Page.i().set_current);
        x.bind(
            document,
            'mouseup',
            d_side_panel.Scroll.i().stop_remember_scrolling_position_0_35_seconds_timeout,
        );
        x.bind(document, 'mousemove', d_img_action_bar.Visibility.i().change);
    }, 'ges_1082');
