import { db, i_data, i_db } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public ip_to_country_loaded_into_inexed_db = false;

    public populate_indexed_db_from_ip_to_country_csv = (): Promise<void> =>
        err_async(async () => {
            const response = await fetch('IpToCountry.csv');
            const ip_to_country_text: string = await response.text();
            const ip_to_country_csv_char_count: number = ip_to_country_text.length;
            const storage: i_data.Settings = await ext.storage_get(
                'last_ip_to_country_csv_char_count',
            );

            const new_ip_to_country_csv_detected: boolean =
                ip_to_country_csv_char_count !== storage.last_ip_to_country_csv_char_count;

            const ip_to_country_db_row_count: number = await db.ip_to_country.count();
            const ip_to_country_db_is_empty = ip_to_country_db_row_count === 0;

            if (new_ip_to_country_csv_detected || ip_to_country_db_is_empty) {
                await db.ip_to_country.clear();
                await ext.storage_set({
                    last_ip_to_country_csv_char_count: ip_to_country_csv_char_count,
                });

                const ip_to_country_text_no_information_and_notes = ip_to_country_text.substring(
                    ip_to_country_text.lastIndexOf('#') + 2,
                );
                const ip_to_country_arr =
                    ip_to_country_text_no_information_and_notes.split(/\r?\n/);
                const ip_to_country_db_arr: (i_db.IpToCountryBase | undefined)[] =
                    ip_to_country_arr.map((item: string): i_db.IpToCountryBase | undefined =>
                        err(() => {
                            const item_arr: string[] = item.split(',');

                            if (n(item_arr) && n(item_arr[0]) && n(item_arr[4])) {
                                return {
                                    ip_from: +this.normalize_val({ val: item_arr[0] }),
                                    country_code: this.normalize_val({ val: item_arr[4] }),
                                };
                            }

                            return undefined;
                        }, 'ges_1009'),
                    );

                const ip_to_country_db_arr_no_undefined: i_db.IpToCountryBase[] =
                    ip_to_country_db_arr.filter((item: i_db.IpToCountryBase | undefined): boolean =>
                        err(() => n(item), 'ges_1165'),
                    ) as i_db.IpToCountryBase[];

                await db
                    .transaction('rw', db.ip_to_country, async () => {
                        await db.ip_to_country.bulkAdd(ip_to_country_db_arr_no_undefined as any);
                    })
                    .catch((error: Error) => {
                        show_err_ribbon(error, 'ges_1163');
                    });

                ext.send_msg_to_all_tabs({ msg: 'rerun_actions' });
            }

            this.ip_to_country_loaded_into_inexed_db = true;
        }, 'ges_1010');

    private normalize_val = ({ val }: { val: string }): string =>
        err(() => val.replace(/"/g, ''), 'ges_1011');
}
