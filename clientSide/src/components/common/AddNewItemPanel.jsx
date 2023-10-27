import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import * as styles from "../../styles/components/AddNewItemPanel.css";
import SyCard from "./SyCard";
import SyButton from "./SyButton";
import productService from "../../services/productService";
import { toast } from "react-toastify";

function AddNewItemPanel({ setShowAddNewPanel, category, fetchCollections }) {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    category: category,
    newCollection: "",
    code: "",
    description: "",
    urls: [],
    downloadUrls: [],
    onSale: false,
    title: "",
    products: [{} ],
  });

  // Destructure data state nested object properties
  const {
    newCollection,
    code,
    description,
    // urls,
    // downloadUrls,
    onSale,
    title,
    products,
  } = productData;

  // const [{ id, name, rrp, stock }] = products;

  // Form event handlers:
  // [1] handleTextChange will handle change in state value event for TEXT data
  // NOTE: To update state object, we create shallow copy & mutate properties according to input field changed
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // handle text input change
  const handleProductTextChange = (e, index, field) => {
    const { value } = e.target;
    const updatedProducts = [...products]; // make a shallow copy of products
    updatedProducts[index][field] = value; // add new value to each product in array

    console.log(
      "Array.isArray(updatedProducts)",
      Array.isArray(updatedProducts),
      updatedProducts
    );
    setProductData({ ...productData, products: updatedProducts }); // add new products array to productData
  };

  // [2.1] handleImageChange will handle change in state for IMAGE data
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("image file is:", file);
    setProductData({ ...productData, urls: file });
  };
  // [2.2] handleFileChange will handle change in state for FILE data
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("pdf file is:", file);
    setProductData({ ...productData, downloadUrls: file });
  };
  //  Opens a new section to add one more variant
  const addProduct = () => {
    const newProducts = [...products, { id: "", name: "", rrp: 0, stock: 0 }]; // default values
    setProductData({ ...productData, products: newProducts });
  };

  // Run function when SUBMIT is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // API request
    try {
      const response = await productService.post(productData);
      console.log("response is:", response);
      toast.success(`${productData.title} has been created successfully`);
      // setLoading(false);
      fetchCollections();
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      setShowAddNewPanel(false);
    } catch (err) {
      console.log("Error: " + err);
      toast.error(`${err}`);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  console.log("ProductData is:", productData);
  console.log(
    "Array.isArray productData.products is:",
    Array.isArray(productData.products)
  );

  return (
    <Container>
      <div className={`${styles.container} shadow`}>
        <h1> AddNewItemPanel {category}</h1>
        <button
          onClick={() => {
            setShowAddNewPanel(false);
          }}
        >
          X
        </button>
        <SyCard title="Add Product">
          <span>
            You are adding a new product into category of <b>{`${category}`}</b>
          </span>
          <Form onSubmit={handleSubmit}>
            {/* GROUP 1 New Collection */}
            <Form.Group className="mb-3 mt-3">
              <Form.Label>New Collection</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new collection name"
                name="newCollection"
                value={newCollection}
                onChange={handleTextChange}
              />
            </Form.Group>
            {/*GROUP 2 Product Code */}
            <Form.Group className="mb-3">
              <Form.Label>Product Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product code"
                name="code"
                value={code}
                onChange={handleTextChange}
              />
            </Form.Group>
            {/*GROUP 3 Product Description */}
            <Form.Group className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Enter product description"
                name="description"
                value={description}
                onChange={handleTextChange}
              />
            </Form.Group>
            {/* GROUP 4 Product Title */}
            <Form.Group className="mb-3">
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product title"
                name="title"
                value={title}
                onChange={handleTextChange}
              />
            </Form.Group>
            {/* GROUP 5 & 6: IMAGE UPLOAD & PDF FILE UPLOAD */}
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Product image</Form.Label>
                  <Form.Control
                    type="file"
                    className="mb-4"
                    name="urls"
                    onChange={handleImageChange}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3" controlId="pdf-file">
                  <Form.Label>PDF File Upload</Form.Label>
                  <Form.Control
                    type="file"
                    className="mb-4"
                    name="downloadUrls"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* GROUP 7: onSale */}
            <Row>
              <Col lg={6} md={6} sm={12}>
                {" "}
                <Form.Group className="mb-3">
                  <Form.Label>Product sale status</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Standard"
                    name="onSale"
                    value="false"
                    checked={onSale === "false"}
                    onChange={handleTextChange}
                  />
                  <Form.Check
                    type="radio"
                    label="On Sale"
                    name="onSale"
                    value="true"
                    checked={onSale === "true"}
                    onChange={handleTextChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/***********  GROUP 8: Product Details  *************/}
            {products.map((product, index) => (
              <div key={index}>
                <hr style={{ color: "red" }} />
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter variant ID"
                        name={`products[${index}].id`}
                        value={product.id}
                        onChange={(e) =>
                          handleProductTextChange(e, index, "id")
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter variant name"
                        name={`products[${index}].name`}
                        value={product.name}
                        onChange={(e) =>
                          handleProductTextChange(e, index, "name")
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Price</Form.Label>
                      <InputGroup>
                        <InputGroup.Text id={`price-dollar-${index}`}>
                          $
                        </InputGroup.Text>
                        <Form.Control
                          type="number"
                          aria-describedby={`price-dollar-${index}`}
                          placeholder="0"
                          name={`products[${index}].rrp`}
                          value={product.rrp}
                          onChange={(e) =>
                            handleProductTextChange(e, index, "rrp")
                          }
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Stock</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        name={`products[${index}].stock`}
                        value={product.stock}
                        onChange={(e) =>
                          handleProductTextChange(e, index, "stock")
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            ))}
            <Form.Group className="mb-3">
              <button type="button" onClick={addProduct}>
                Add Another Product(Variant)
              </button>
            </Form.Group>
            <SyButton loading={loading}>
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Submit"
              )}
            </SyButton>
          </Form>
        </SyCard>
      </div>
    </Container>
  );
}

export default AddNewItemPanel;