class ServiceAlreadyRegistered extends Error {
  get name () { return 'ServiceAlreadyRegistered' }
}
class ServiceNotRegistered extends Error {
  get name () { return 'ServiceNotRegistered' }
}

class ServiceLocator {
  static prepare () {
    if (!this._registry) this._registry = {}
  }

  static reset () {
    this._registry = {}
  }

  /**
   * @return {Array}
   */
  static entries () {
    return (this._registry) ? Object.keys(this._registry) : []
  }

  /**
   * @param {string} name
   * @return {boolean}
   */
  static has (name) {
    return this._registry && Object.prototype.hasOwnProperty.call(this._registry, name)
  }

  /**
   * @param {string} name
   * @param {object} obj
   * @param {boolean} force
   * @return {object}
   */
  static register (name, obj, force = false) {
    this.prepare()

    if (this.has(name) && !force) {
      throw new ServiceAlreadyRegistered(`\`${name}\` has already registered`)
    } else {
      this._registry[name] = obj
      return obj
    }
  }

  /**
   * @param {object} sets
   * @param {boolean} force
   */
  static bulkRegister (sets, force = false) {
    Object.entries(sets).forEach((set) => {
      var [name, service] = set

      this.register(name, service, force)
    })
  }

  /**
   * @param {string} name
   * @return {object}
   */
  static get (name) {
    this.prepare()

    if (this.has(name)) {
      return this._registry[name]
    } else {
      throw new ServiceNotRegistered(`\`${name}\` has not registerd`)
    }
  }
}

module.exports = ServiceLocator
