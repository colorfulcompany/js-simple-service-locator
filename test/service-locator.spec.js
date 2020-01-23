/* global describe, it, beforeEach, afterEach */

const ServiceLocator = require('service-locator')

const assert = require('power-assert')

describe('ServiceLocator', () => {
  afterEach(() => {
    ServiceLocator.reset()
  })

  describe('.clone()', () => {
    let locator

    describe('cloned locator entries', () => {
      beforeEach(() => {
        locator = ServiceLocator.clone('ClonedLocator')
        ServiceLocator.register('assert', assert)
        locator.register('power', assert)
      })

      it('different', () => {
        assert.notDeepEqual(
          ServiceLocator.entries(),
          locator.entries()
        )
      })
    })

    describe('locator already has entries', () => {
      beforeEach(() => {
        ServiceLocator.register('assert', assert)
        locator = ServiceLocator.clone('ClonedLocator')
      })

      it('cloned locator has nothing', () => {
        assert.deepEqual(locator.entries(), [])
      })
    })
  })

  describe('.entries', () => {
    describe('empty', () => {
      it('return zero size array', () => {
        assert.deepEqual(ServiceLocator.entries(), [])
      })
    })

    describe('one item registered', () => {
      it('return keys', () => {
        ServiceLocator.register('foo', {})
        assert.deepEqual(ServiceLocator.entries(), ['foo'])
      })
    })
  })

  describe('.get', () => {
    describe('not registered', () => {
      it('tnrow error', () => {
        assert.throws(
          () => ServiceLocator.get('foo'),
          { name: 'ServiceNotRegistered' }
        )
      })
    })

    describe('registered', () => {
      it('return ragular object', () => {
        ServiceLocator.register('foo', {})
        assert(ServiceLocator.get('foo'))
      })
    })
  })

  describe('.register', () => {
    describe('duplicated', () => {
      beforeEach(() => {
        ServiceLocator.register('foo', {})
      })

      it('throw error', () => {
        assert.throws(
          () => ServiceLocator.register('foo', {}),
          { name: 'ServiceAlreadyRegistered' }
        )
      })

      it('given force, then  ', () => {
        ServiceLocator.register('foo', { name: 'foo2' }, true)
        assert.deepEqual(
          ServiceLocator.get('foo'),
          { name: 'foo2' }
        )
      })
    })
  })
})
