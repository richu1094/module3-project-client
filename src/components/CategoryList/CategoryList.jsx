import CategoryCard from "../CategoryCard/CategoryCard"

const CategoryList = ({ category, refreshCategory }) => {
    return category.map((eachCategory, i) => <CategoryCard eachCategory={eachCategory} refreshCategory={refreshCategory} key={i} />)
}

export default CategoryList