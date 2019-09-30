import React, {useState} from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UploadImage from '../cloudinary/UploadImage';
import ProductForm from "./ProductForm";
import ProductAttr from "./ProductAttr";
import {addProduct} from '../../actions/products';
import { IMAGE_NAME, IMAGE_URL} from '../../constants';

const validate = (
  thumbnail,
  fileName,
  productName,
  categories,
  description,
  attributes,
  price,
  discount
) =>{
  // true means invalid, so our conditions got reversed
  return {
    productName: productName.length === 0,
    categories: categories.length === 0,
    description: description.length === 0,
    attributes: attributes.length === 0,
    price: price.length === 0,
    discount: discount.length === 0,
  };
};

const AddProduct = (props) => {
  const { addProduct, products } = props;
  const [inputs, setInputs] = useState(
    {
      thumbnail: IMAGE_URL,
      productName: '',
      categories: [],
      description: '',
      attributes: [],
      price: '',
      discount: '',
      fileName: IMAGE_NAME,
      loading: false,
      attemptedInput : {
        productName: true,
        categories: true,
        description: true,
        attributes: true,
        price: true,
        discount: true,
      }
    });
  const [, setAttemptedInput] = useState( {
    productName: true,
    categories: true,
    description: true,
    attributes: true,
    price: true,
    discount: true,
  });

  const [thumbnail, setThumbnail] = useState(IMAGE_URL);
  const [fileName, setFileName] = useState(IMAGE_NAME);
  const [loading, setLoading] = useState(false);

  const handleChange = (event, {name, value}) => {
    event.persist();
    setInputs({ ...inputs, [name]: value });
  };

  const {  productName, categories, description,
    attributes, price, discount } = inputs;

  const handleBlur = (field) => () => {
    setAttemptedInput({ attemptedInput: { [field] : false } });
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget({ cloud_name: 'fundit-app', upload_preset: 'fua6wfmh', tags:['fundit']},
      async (error, result) => {
        setThumbnail(result[0].url);
        setFileName(result[0].original_filename);
        await localStorage.setItem('image_url', result[0].url);
        await localStorage.setItem('image_name',result[0].original_filename);
      });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    
    setLoading(true);

    await addProduct(
      productName,
      categories,
      description,
      attributes,
      price,
      discount
    );

    await localStorage.removeItem('image_url');
    await localStorage.removeItem('image_name');

    return products ? window.location.replace('/') : setLoading(false)
  };

  const errors = validate(
    thumbnail,
    fileName,
    productName,
    categories,
    description,
    attributes,
    price,
    discount
  );

  const imageUrl = thumbnail ? thumbnail : "https://react.semantic-ui.com/images/wireframe/image.png";

  return (
    <div>
      <Grid centered textAlign="center">
        <Grid.Column width={4} textAlign="center">
          <div className="ui small image">
            <img alt="placeholder" src={imageUrl} width={150} height={150} />
            <br />
            <h6>{fileName}</h6>
            <UploadImage
              uploadWidget={uploadWidget}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={8}>
          <ProductForm
            loading={loading}
            productName={productName}
            categories={categories}
            description={description}
            attributes={attributes}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            errors={errors}
            state={inputs}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <ProductAttr
            price={price}
            discount={discount}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            state={inputs}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
};

AddProduct.propTypes = {
  thumbnail_url: PropTypes.string,
  original_filename: PropTypes.string,
  cloudinary: PropTypes.object,
  openUploadWidget: PropTypes.func
};

export default connect(
  ({ products }) => ({ products }),
  {addProduct}
)(AddProduct);
