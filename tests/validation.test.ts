import { expect } from 'chai';
import {Validator} from '../src/utils/validators.ts'

describe('Validators Testing', () => {

    const validator: Validator = new Validator;

    it('returns true on valid name', () =>{
        const result = validator.isValidName('Denys');

        expect(result).to.be.equal(true);
    });

    it('returns false on empty name', () =>{
        const result = validator.isValidName('');

        expect(result).to.be.equal(false);
    });

    it('returns true on valid email', () =>{
        const result = validator.isValidEmail('denys@gmail.com');

        expect(result).to.be.equal(true);
    });

    it('returns false on invalid email', () =>{
        const result = validator.isValidEmail('denys@gm');

        expect(result).to.be.equal(false);
    });

    it('returns true on valid year', () =>{
        const result = validator.isValidYear('2026');

        expect(result).to.be.equal(true);
    });

    it('returns false on invalid year', () =>{
        const result = validator.isValidYear('226');

        expect(result).to.be.equal(false);
    });

});