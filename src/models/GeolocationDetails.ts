export class GeolocationDetails {

    // define the fields that will be used to create the sql query string
    public static database_query_fields: string[] = [
        'rec_id',
        'ip_address',
        'city',
        'city_geoname_id',
        'region',
        'region_iso_code',
        'postal_code',
        'country',
        'country_code',
        'country_geoname_id',
        'country_is_eu',
        'continent',
        'continent_code',
        'continent_geoname_id',
        'longitude',
        'latitude',
        'security__is_vpn',
        'timezone__name',
        'timezone__abbreviation',
        'timezone__gmt_offset',
        'timezone__current_time',
        'timezone__is_dst',
        'flag__emoji',
        'flag__unicode',
        'flag__png',
        'flag__svg',
        'currency__currency_name',
        'currency__currency_code',
        'connection__autonomous_system_number',
        'connection__autonomous_system_organization',
        'connection__connection_type',
        'connection__isp_name',
        'connection__organization_name',
    ];


    rec_id?: number;
    ip_address: string;
    city: string;
    city_geoname_id: number;
    region: string;
    region_iso_code: string;
    region_geoname_id: number;
    postal_code?: string;
    country: string;
    country_code: string;
    country_geoname_id: number;
    country_is_eu: boolean;
    continent: string;
    continent_code: string;
    continent_geoname_id: number;
    longitude: number;
    latitude: number;

    security: {
        is_vpn: boolean;
    };

    timezone: {
        name: string;
        abbreviation: string;
        gmt_offset: string;
        current_time: string | Date;
        is_dst: boolean;
    };

    flag: {
        emoji: string;
        unicode: string;
        png: string;
        svg: string;
    };

    currency: {
        currency_name: string;
        currency_code: string;
    };

    connection: {
        autonomous_system_number: number;
        autonomous_system_organization: string;
        connection_type: string;
        isp_name: string;
        organization_name: string
    };


    constructor(props?: GeolocationDetails) {

        this.rec_id = props?.rec_id || null;
        this.ip_address = props?.ip_address || null;
        this.city = props?.city || null;
        this.city_geoname_id = props?.city_geoname_id || null;
        this.region = props?.region || null;
        this.region_iso_code = props?.region_iso_code || null;
        this.region_geoname_id = props?.region_geoname_id || null;
        this.postal_code = props?.postal_code || null;
        this.country = props?.country || null;
        this.country_code = props?.country_code || null;
        this.country_geoname_id = props?.country_geoname_id || null;
        this.country_is_eu = props?.country_is_eu ? true : false;
        this.continent = props?.continent || null;
        this.continent_code = props?.continent_code || null;
        this.continent_geoname_id = props?.continent_geoname_id || null;
        this.longitude = props?.longitude || null;
        this.latitude = props?.latitude || null;

        this.security = props?.security || {
            is_vpn: false
        };

        this.timezone = props?.timezone || {
            name: null,
            abbreviation: null,
            gmt_offset: null,
            current_time: null,
            is_dst: false,
        };

        this.flag = props?.flag || {
            emoji: null,
            unicode: null,
            png: null,
            svg: null,
        };

        this.currency = props?.currency || {
            currency_name: null,
            currency_code: null,
        };

        this.connection = props?.connection || {
            autonomous_system_number: null,
            autonomous_system_organization: null,
            connection_type: null,
            isp_name: null,
            organization_name: null,
        };

    }

}
