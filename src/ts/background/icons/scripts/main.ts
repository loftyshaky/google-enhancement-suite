import _ from 'lodash';

import { t } from '@loftyshaky/shared';

import { s_icons, i_data, i_icons } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public ip_to_country: i_icons.IpToCountry[] = [];
    private generating_ip_to_country_arr = true;
    private requested_server_location_before_ip_to_country_arr_was_ready = false;

    private empty_favicons: t.StringRecord = {
        google: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVR4AWL4//8/RRjO8Iucx+noO0O2qmlbUEnt5r3Juas+hsQD6KaG7dqCKPgx72Pe9GIY27btZBrbtm3btm0nO12D7tVXe63jqtqqU/iDw9K58sEruKkngH0DBljOE+T/qqx/Ln718RZOFasxyd3XRbWzlFMxRbgOTx9QWFzHtZlD+aqLb108sOAIAai6+NbHW7lUHaZkDFJt+wp1DG7R1d0b7Z88EOL08oXwjokcOvvUxYMjBFCamWP5KjKBjKOpZx2HEPj+Ieod26U+dpg6lK2CIwTQH0oECGT5eHj+IgSueJ5fPaPg6PZrz6DGHiGAISE7QPrIvIKVrSvCe2DNHSsehIDatOBna/+OEOgTQE6WAy1AAFiVcf6PhgCGxEvlA9QngLlAQCkLsNWhBZIDz/zg4ggmjHfYxoPGEMPZECW+zjwmFk6Ih194y7VHYGOPvEYlTAJlQwI4MEhgTOzZGiNalRpGgsOYFw5lEfTKybgfBtmuTNdI3MrOTAQmYf/DNcAwDeycVjROgZFt18gMso6V5Z8JpcEk2LPKpOAH0/4bKMCAYnuqm7cHOGHJTBRhAEJN9d/t5zCxAAAAAElFTkSuQmCC',
        yandex: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4AWIAAYAAAwAABQABggWTzwAAAABJRU5ErkJggg==',
        duckduckgo:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkI4OUQxMDdDQTYwMTFFNEJGMThCRkI4NTA4NTkyNkYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkI4OUQxMDhDQTYwMTFFNEJGMThCRkI4NTA4NTkyNkYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCQjg5RDEwNUNBNjAxMUU0QkYxOEJGQjg1MDg1OTI2RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQjg5RDEwNkNBNjAxMUU0QkYxOEJGQjg1MDg1OTI2RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjGq5lQAAAI0SURBVHja1Jo9jsIwEIW9Fh17gBxgD0B63EPPBXIBDkAP/Ub0XIAeeuiTA3CAHID061mNkWXlPzN28qQRQojkffZkPEn8dT6fBYFiHSv8jDCqVGBkOnL8HKXFSNNbHUrHsuN/DNwKv5c6HjpuQ2EWA40nlokxAvANBszIpS9IHwAYub2OteARDMivjqeOFFOtVbLjwRWODpd5W2s8l6ICgFE/9shzQZRaRzz3KICDjp0Ipx16GARwwIsrtDZNELIhbaZg3obYdwVQgdOmKZ1UG0DUlnOBdXBXeVmROssJAyzdVJLOCktV51867ozrRFy1EieE5mGU3tYFSK3EtBzS6SapzZ+YZsJ0vh+ALYN5wQyxtQEUEcC75jcOCGUAYqLKs2kpwdQQ4DmWRLkfCmIl7ZI0Q4j/GYh8N2CEEBEXgC+ISApesUNwA7BD+ABglQ+AO44yy52fnLN5A1DM1Tx45wLwYf4DkM3UPCgDgHym5kG5mYFyhuZLMwOgB8EBf3R8ezL/8WwAbkQAaQUE1xO+mw2QEV0LLgSX+dy9qQddiA5uIDifrV6qVmIgehJCcJl/2qXfbSVSoorEpRI91vZCRUspDK2T2znImvJ0naD5a1W5r+tGU8H3bHPoIpn2badPE4FoXOFlh5y7Bk6bxmuyy3viFMsW1HVf7w5KNN7a4nS9I4MDJYTrRFudT7r2Z33e1Bc4C5RbDdz2gHWrgb1iZ2LYZo+qVPG+2cMFESLgdps/AQYA9D2Sc4DqpGYAAAAASUVORK5CYII=',
    };

    public get_favicon_url = ({ url }: { url: string }): Promise<string | undefined> =>
        err_async(async () => {
            const settings = await ext.storage_get();
            const favicon_providers: string[] = Object.keys(s_icons.Main.i().favicon_providers);
            let icon_url: string | undefined;

            // eslint-disable-next-line no-restricted-syntax
            for await (const favicon_provider of favicon_providers) {
                if (settings.favicon_providers[favicon_provider]) {
                    icon_url = await this.get_favicon_url_inner({
                        url,
                        favicon_provider,
                    });
                    const favicon_is_present = n(icon_url);

                    if (favicon_is_present) {
                        break;
                    }
                }
            }

            return icon_url;
        }, 'ges_1005');

    private get_favicon_url_inner = ({
        url,
        favicon_provider,
    }: {
        url: string;
        favicon_provider: string;
    }): Promise<string | undefined> =>
        err_async(async () => {
            const icon_url: string = s_icons.Main.i().construct_favicon_url({
                favicon_provider,
                url,
            });
            const response = await fetch(icon_url);
            const blob: Blob = await response.blob();

            const base64: string = await x.convert_blob_to_base64(blob);

            const favicon_is_empty = this.empty_favicons[favicon_provider] === base64;

            if (favicon_is_empty) {
                return undefined;
            }

            return base64;
        }, 'ges_1006');

    public get_server_info = async ({
        url,
    }: {
        url: string;
    }): Promise<i_icons.ServerInfo | string> =>
        err_async(async () => {
            if (this.generating_ip_to_country_arr) {
                this.requested_server_location_before_ip_to_country_arr_was_ready = true;

                return 'ip_to_country_arr_is_not_yet_generated';
            }

            const empty_row = {
                ip: '',
                country_code: '',
                country_name: '',
            };

            try {
                if (n(this.ip_to_country)) {
                    const settings: i_data.Settings = await ext.storage_get();
                    const region_name: t.AnyRecord = new (Intl as any).DisplayNames(
                        [
                            settings.enable_cut_features
                                ? we.i18n.getUILanguage()
                                : navigator.language,
                        ],
                        { type: 'region' },
                    );
                    const response_2: Response = await fetch(
                        `https://dns.google/resolve?name=${url}`,
                    );
                    const json: any = await response_2.json();
                    const ip: string = (_.last(json.Answer) as any).data;

                    const record: i_icons.IpToCountry | undefined = _.findLast(
                        this.ip_to_country,
                        (item: i_icons.IpToCountry): boolean =>
                            err(
                                () => item.ip_from < this.convert_ip_to_ip_number({ ip }),
                                'ges_1007',
                            ),
                    );

                    if (n(record)) {
                        return {
                            ip,
                            country_code: record.country_code,
                            country_name: region_name.of(record.country_code),
                        };
                    }
                }

                return empty_row;
            } catch (error_obj: any) {
                show_err_ribbon(error_obj, 'ges_1008');

                return empty_row;
            }
        }, 'ges_1009');

    public generate_ip_to_country_arr = (): Promise<void> =>
        err_async(async () => {
            const response = await fetch(we.runtime.getURL('ip_to_country_ipv4.csv'));
            const ip_to_country_text: string = await response.text();

            const ip_to_country_arr = ip_to_country_text.split(/\r?\n/);
            const ip_to_country_db_arr: (i_icons.IpToCountry | undefined)[] = ip_to_country_arr.map(
                (item: string): i_icons.IpToCountry | undefined =>
                    err(() => {
                        const item_arr: string[] = item.split(',');

                        if (n(item_arr) && n(item_arr[0]) && n(item_arr[2])) {
                            return {
                                ip_from: this.convert_ip_to_ip_number({
                                    ip: item_arr[0],
                                }),
                                country_code: item_arr[2],
                            };
                        }

                        return undefined;
                    }, 'ges_1010'),
            );

            this.ip_to_country = ip_to_country_db_arr.filter(
                (item: i_icons.IpToCountry | undefined): boolean => err(() => n(item), 'ges_1011'),
            ) as i_icons.IpToCountry[];

            this.generating_ip_to_country_arr = false;

            if (this.requested_server_location_before_ip_to_country_arr_was_ready) {
                ext.send_msg_to_all_tabs({ msg: 'run_deferred_generate_server_location_url_fs' });
            }
        }, 'ges_1012');

    private convert_ip_to_ip_number = ({ ip }: { ip: string }): number =>
        err(() => {
            const ip_sub_blocks: string[] = ip.split('.');
            const ip_number: number =
                16777216 * +ip_sub_blocks[0] +
                65536 * +ip_sub_blocks[1] +
                256 * +ip_sub_blocks[2] +
                +ip_sub_blocks[3];

            return ip_number;
        }, 'ges_1013');
}
