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

    /////////////

    // 获取用户信息
    static checkOrder = async (params: ApiType.checkOrder, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        const option = Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } });
        return await service.get(`${this.meta.baseUrl}/user/checkOrder`, { params, ..._options });
    };

    // 出售算力
    static trade = async (data: ApiType.trade, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.post(`${this.meta.baseUrl}/user/sellpower`, data, Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };

    // 余额提币
    static claim = async (data: ApiType.claim, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.post(`${this.meta.baseUrl}/user/claimfloki`, data, Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };
}

export default Server;
