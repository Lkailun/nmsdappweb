import { headers } from 'next/dist/client/components/headers';
import service from './axios';
class Server {
    static meta = {
        baseUrl: 'https://back.floki.work'
    };

    // 获取用户信息
    static getUserInfo = async (params: ApiType.fetchUser, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        const option = Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } });
        return await service.get(`${this.meta.baseUrl}/userinfo/userdata`, { params, ...option });
    };

    // 获取用户信息
    static checkOrder = async (params: ApiType.checkOrder, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        const option = Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } });
        return await service.get(`${this.meta.baseUrl}/userinfo/checkOrder`, { params, ..._options });
    };

    // 新用户注册/老用户绑定
    static register = async (data: ApiType.register, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.post(`${this.meta.baseUrl}/userinfo/register`, data, Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };

    // 转入/转出银行
    static transfer = async (data: ApiType.transfer, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.post(`${this.meta.baseUrl}/userinfo/bankio`, data, Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };

    // 出售算力
    static trade = async (data: ApiType.trade, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.post(`${this.meta.baseUrl}/userinfo/sellpower`, data, Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };

    // 余额提币
    static claim = async (data: ApiType.claim, sign: ApiType.sign, _options: Record<string, any> = {}): Promise<any> => {
        return await service.post(`${this.meta.baseUrl}/userinfo/claimfloki`, data, Object.assign(_options, { headers: { Authorization: `${sign.message}-${sign.signature}` } }));
    };
}

export default Server;
