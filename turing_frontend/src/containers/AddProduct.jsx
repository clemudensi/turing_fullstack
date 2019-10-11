import React, {useState, useEffect} from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UploadImage from '../components/cloudinary/UploadImage';
import ProductForm from "../components/product/ProductForm";
import ProductAttr from "../components/product/ProductAttr";
import {addProduct} from '../actions/products';
import { uploadImage } from "../actions/upload_image";

import {IMAGE_NAME, IMAGE_URL, PAYMENT} from '../constants';
import {bindActionCreators} from "redux";

const validate = (
  productImage,
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
  const { addProduct, uploadImage, products, upload_image } = props;
  const [inputs, setInputs] = useState(
    {
      productImage: '',
      fileName: '',
      productName: '',
      categories: [],
      description: '',
      attributes: [],
      price: '',
      discount: '',
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

  const [productImage, ] = useState(IMAGE_URL);
  const [fileName, ] = useState(IMAGE_NAME);
  const [loading, setLoading] = useState(false);
  const [uploadFile, setUploadFile] = useState({ name: ''});
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const { name } = uploadFile;
  const formData = new FormData();
  formData.append('files', uploadFile);

  const handleChange = (event, {name, value}) => {
    event.persist();
    setInputs({ ...inputs, [name]: value });
  };

  const {  productName, categories, description,
    attributes, price, discount } = inputs;

  const handleBlur = (field) => () => {
    setAttemptedInput({ attemptedInput: { [field] : false } });
  };

  const selectImage = async (event) => {
    if (event.target.files[0]){
      setUploadFile(event.target.files[0]);
    } else {
      return null
    }
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

  };

  const errors = validate(
    productImage,
    fileName,
    productName,
    categories,
    description,
    attributes,
    price,
    discount
  );

  const imageUrl = productImage ? productImage : "https://react.semantic-ui.com/images/wireframe/image.png";

  const imageLoader = () => {
    setLoadingImage(false);
    setLoadingStatus(true);
  };

  const sendImage = () => {
    if ( name !== ''){
      setLoadingImage(true);
      uploadImage(formData)
    }
  };

  useEffect(() => {
    if (upload_image.data.status === 'Success') return imageLoader();

    products.data.success ? window.location.replace('/') : setLoading(false);

  }, [products, upload_image]);

  return (
    <div>
      <Grid centered textAlign="center">
        <Grid.Column width={4} textAlign="center">
          <div className="ui small image">
            <img alt="placeholder" src={imageUrl} width={150} height={150} />
            <br />
            <h6>{fileName}</h6>
            <UploadImage
              selectImage={selectImage}
              fileName={name}
              loadingImage={loadingImage}
              loadingStatus={loadingStatus}
              sendImage={sendImage}
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

const mapStateToProps = (state) => {
  return {
    products: state.products,
    upload_image: state.upload_image
  };
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ addProduct, uploadImage }, dispatch)
);

AddProduct.propTypes = {
  productImage_url: PropTypes.string,
  original_filename: PropTypes.string,
  cloudinary: PropTypes.object,
  openUploadWidget: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);