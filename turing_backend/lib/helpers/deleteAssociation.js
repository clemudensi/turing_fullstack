module.exports = async (ProductAssociation, product_id) => (
  /* remove products from a given Product Association model */
  await ProductAssociation.destroy({
    where: { product_id: await ProductAssociation
        .findAll(
          { where: { product_id },
            attributes: ["product_id"]}
        )
        .map(item => item.product_id)
    }
  })
);