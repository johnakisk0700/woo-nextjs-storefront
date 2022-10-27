import { PhoneIcon } from "@chakra-ui/icons";
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

import { FaUser, FaCity } from "react-icons/fa";
import { TbDialpad } from "react-icons/tb";
import { MdLocationPin, MdAlternateEmail, MdElevator } from "react-icons/md";
import { BsFillSignpostFill } from "react-icons/bs";

const PersonalInfoForm = ({ input, handleOnChange, isShipping }) => {
  const { errors } = input || {};
  const iconColor = useColorModeValue("gray.600", "gray.300");
  return (
    <Stack gap={2}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={FaUser} color={iconColor} />}
        />
        <Input
          name="firstName"
          value={input?.firstName}
          required
          onChange={handleOnChange}
          placeholder="Όνομα"
        />
      </InputGroup>

      <InputGroup>
        <InputLeftElement pointerEvents="none" />
        <Input
          name="lastName"
          value={input?.lastName}
          required
          onChange={handleOnChange}
          placeholder="Επώνυμο"
          errors={errors}
        />
      </InputGroup>

      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={MdElevator} color={iconColor} />}
        />
        <Input
          name="orofos"
          value={input?.orofos}
          required
          onChange={handleOnChange}
          placeholder="Όροφος"
          errors={errors}
        />
      </InputGroup>

      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={TbDialpad} color={iconColor} />}
        />
        <Input
          name="koudouni"
          value={input?.koudouni}
          required
          onChange={handleOnChange}
          placeholder="Κουδούνι"
          errors={errors}
        />
      </InputGroup>

      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={MdLocationPin} color={iconColor} />}
        />
        <Input
          name="address1"
          value={input?.address1}
          required
          onChange={handleOnChange}
          placeholder="Οδός"
          errors={errors}
        />
      </InputGroup>

      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={FaCity} color={iconColor} />}
          background="transparent"
          disabled
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
      </InputGroup>

      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={BsFillSignpostFill} color={iconColor} />}
        />
        <Input
          name="postcode"
          value={input?.postcode}
          required
          onChange={handleOnChange}
          placeholder="T.K."
          errors={errors}
        />
      </InputGroup>

      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<PhoneIcon color={iconColor} />}
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

      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={MdAlternateEmail} color={iconColor} />}
        />
        <Input
          name="email"
          type="email"
          value={input?.email}
          required
          onChange={handleOnChange}
          placeholder="Email"
          errors={errors}
        />
      </InputGroup>

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

PersonalInfoForm.propTypes = {
  input: PropTypes.object,
  countries: PropTypes.array,
  handleOnChange: PropTypes.func,
  isFetchingStates: PropTypes.bool,
  isShipping: PropTypes.bool,
};

PersonalInfoForm.defaultProps = {
  input: {},
  countries: [],
  handleOnChange: () => null,
  isFetchingStates: false,
  isShipping: false,
};

export default PersonalInfoForm;
