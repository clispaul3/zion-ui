import { BaseService } from "../../Base/BaseService"

export class Service extends BaseService {
  constructor({ controlKey }) {
    super({ controlKey })
  }
  showAll_onChange = ({ value }) => {
    this.attr_change({ value, attr: "showAll" })
  }
}
