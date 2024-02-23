import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class OrderClient extends JanusClient {
  
    public readonly routes = {
        getOrder: (account: string, orderId: string) => `http://${account}.vtexcommercestable.com.br/api/oms/pvt/orders/${orderId}`
    } 
  
    constructor(context: IOContext, options?: InstanceOptions) {

    super( context, {
        ...options,
        headers: {
            VtexIdclientAutCookie: context.authToken,
            'Cache-Control': 'no-cache'
        }
    })
  }

  public async getOrder(orderId: string): Promise<VtexOrder> {
    try{
        const order = await this.http.get(this.routes.getOrder(this.context.account, orderId))

        return order
    }
    catch(error){
        throw new Error(error)
    }
  }

}
