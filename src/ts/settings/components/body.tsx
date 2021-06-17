import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { Settings } from '@loftyshaky/shared/settings';
import { d_inputs } from '@loftyshaky/shared/inputs';
import { d_sections } from 'settings/internal';

export const Body = observer(() => {
    useEffect(() => {
        async function run() {
            d_inputs.NestedInput.i().set_all_parents_disbled_vals({
                sections: d_sections.Main.i().sections,
            });
        }

        run();
    },
    []);

    return (
        <Settings
            sections={d_sections.Main.i().sections}
            initial_section={d_sections.Main.i().current_section}
            change_section_callback={(): void => {
                d_inputs.NestedInput.i().set_all_parents_disbled_vals({
                    sections: d_sections.Main.i().sections,
                });

                d_sections.Main.i().change_section_val();
            }}
        />
    );
});
