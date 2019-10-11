import React from 'react';
import {Form, Input, TextArea, Button, Container} from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Categories, Attributes} from '../../constants';
import {isEnabled, showInvalidInputError} from '../../util/formValidation';

const ProductForm = ({
  loading,
  productName,
  attributes,
  categories,
  description,
  errors,
  state,
  handleChange,
  handleSubmit,
  handleBlur
}) => (
  <Form>
    <Form.Group widths='equal'>
      <Form.Field
        name="productName"
        id='form-input-control-product-name'
        control={Input}
        label='Product Name'
        placeholder='Product Name'
        value={productName}
        onChange={handleChange}
        error={showInvalidInputError(
          'productName',
          errors,
          state
        )}
        onBlur={handleBlur('productName')}
        required
      />
    </Form.Group>

    <Form.Group widths='equal'>
      <Form.Field>
        <label>Attributes</label>
        <Dropdown
          name="attributes"
          placeholder='Attributes'
          fluid multiple selection
          options={Attributes}
          onChange={handleChange}
          value={attributes}
          error={showInvalidInputError(
            'attributes',
            errors,
            state
          )}
          onBlur={handleBlur('attributes')}
          required
        />
      </Form.Field>
      <Form.Field>
        <label>Category</label>
        <Dropdown
          name="categories"
          placeholder='Categories'
          fluid multiple selection
          options={Categories}
          onChange={handleChange}
          value={categories}
          error={showInvalidInputError(
            'categories',
            errors,
            state
          )}
          onBlur={handleBlur('categories')}
          required
        />
      </Form.Field>
    </Form.Group>

    <Form.Field
      name="description"
      id='form-textarea-control-opinion'
      control={TextArea}
      label='Product Description'
      placeholder='Description'
      onChange={handleChange}
      value={description}
      error={showInvalidInputError(
        'description',
        errors,
        state
      )}
      onBlur={handleBlur('description')}
      required
    />

    <Container textAlign='center'>
      <Button
        color="teal"
        fluid
        size="large"
        loading={loading}
        onClick={handleSubmit}
        disabled={isEnabled(errors) || loading}
      >
        Submit
      </Button>
    </Container>
  </Form>
);

ProductForm.propTypes = {
  loading: PropTypes.bool,
  productName: PropTypes.string,
  categories: PropTypes.array,
  description: PropTypes.string,
  attributes: PropTypes.array,
  errors: PropTypes.object,
  state: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleBlur: PropTypes.func,
};

export default ProductForm;