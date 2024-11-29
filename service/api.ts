import service from './axios';
class Server {
    static meta = {
        baseUrl: 'https://api.nmsdapp.org'
    };

    // 获取用户信息
    static getUserInfo = async (params: ApiType.fetchUser, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        const option = Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } });
        return await service.get(`${this.meta.baseUrl}/user/userdata`, { params, ...option });
    };

    // 新用户注册/老用户绑定
    static register = async (data: ApiType.register, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.post(`${this.meta.baseUrl}/user/register`, data, Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };

    // 刷新用户资产
    static refreshassets = async (data: any, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.get(`${this.meta.baseUrl}/user/refreshassets`, Object.assign(_options, { params: data, headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };

    // 获得用户的操作相关记录
    static userrecords = async (data: any, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.get(`${this.meta.baseUrl}/user/userrecords`, Object.assign(_options, { params: data, headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };

    // 用户提现资产
    static withdrawassets = async (data: any, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.post(`${this.meta.baseUrl}/user/withdrawassets`, data, Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };

    // 用户内转积分
    static transferintegral = async (data: any, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.post(`${this.meta.baseUrl}/user/transferintegral`, data, Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };

    // 用户闪兑NMS为USDT
    static swapnmmtousdt = async (data: any, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.post(`${this.meta.baseUrl}/user/swapnmmtousdt`, data, Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };

    // 用户质押积分+USDT
    static stakingintegral = async (data: any, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.post(`${this.meta.baseUrl}/user/stakingintegral`, data, Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };

    // 获得幸运转转转游戏信息
    static getluckgamedata = async (data: any, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.get(`${this.meta.baseUrl}/game/getluckgamedata`, Object.assign(_options, { params: data, headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };

    // 幸运转转转游戏下注
    static betluckgame = async (data: any, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.post(`${this.meta.baseUrl}/game/betluckgame`, data, Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };

    // 获得BTC猜涨跌游戏信息
    static getbtcgamedata = async (data: any, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.get(`${this.meta.baseUrl}/game/getbtcgamedata`, Object.assign(_options, { params: data, headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };

    // BTC猜涨跌游戏下注
    static betrisefall = async (data: any, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.post(`${this.meta.baseUrl}/game/betrisefall`, data, Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };
}

export default Server;
