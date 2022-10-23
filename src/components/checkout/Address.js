import { PhoneIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Address = ({ input, handleOnChange, isShipping }) => {
  const { errors } = input || {};

  return (
    <Stack gap={2}>
      <Input
        name="firstName"
        value={input?.firstName}
        required
        onChange={handleOnChange}
        placeholder="Όνομα"
        error={errors && errors.firstName}
      />

      <Input
        name="lastName"
        value={input?.lastName}
        required
        onChange={handleOnChange}
        placeholder="Κουδούνι"
        errors={errors}
      />

      <Input
        name="address1"
        value={input?.address1}
        required
        onChange={handleOnChange}
        placeholder="Οδός"
        errors={errors}
      />

      <Input
        name="city"
        required
        value={input?.city}
        onChange={handleOnChange}
        placeholder="Town/City"
        errors={errors}
        disabled={true}
      />
      <Input
        name="postcode"
        value={input?.postcode}
        required
        onChange={handleOnChange}
        placeholder="T.K."
        errors={errors}
      />

      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<PhoneIcon color="gray.300" />}
        />
        <Input
          name="phone"
          value={input?.phone}
          required
          onChange={handleOnChange}
          placeholder="Τηλέφωνο"
          errors={errors}
        />
      </InputGroup>
      <Input
        name="email"
        type="email"
        value={input?.email}
        required
        onChange={handleOnChange}
        placeholder="Email"
        errors={errors}
      />

      {/*	@TODO Create an Account */}
      {/*<div className="form-check">*/}
      {/*	<placeholder className="leading-7 text-sm text-gray-600" className="form-check-placeholder">*/}
      {/*		<input onChange={ handleOnChange } className="form-check-input" name="createAccount" type="checkbox"/>*/}
      {/*			Create an account?*/}
      {/*	</placeholder>*/}
      {/*</div>*/}
      {/*<h2 className="mt-4 mb-4">Additional Information</h2>*/}
      {/* @TODO Order Notes */}
      {/*<div className="form-group mb-3">*/}
      {/*	<placeholder className="leading-7 text-sm text-gray-600" htmlFor="order-notes">Order Notes</placeholder>*/}
      {/*	<textarea onChange={ handleOnChange } defaultValue={ input.orderNotes } name="orderNotes" className="form-control woo-next-checkout-textarea" id="order-notes" rows="4"/>*/}
      {/*	<Error errors={ input.errors } fieldName={ 'orderNotes' }/>*/}
      {/*</div>*/}
    </Stack>
  );
};

Address.propTypes = {
  input: PropTypes.object,
  countries: PropTypes.array,
  handleOnChange: PropTypes.func,
  isFetchingStates: PropTypes.bool,
  isShipping: PropTypes.bool,
};

Address.defaultProps = {
  input: {},
  countries: [],
  handleOnChange: () => null,
  isFetchingStates: false,
  isShipping: false,
};

export default Address;
