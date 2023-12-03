import CategoryCard from "../CategoryCard/CategoryCard"

const CategoryList = ({ category, loadCategory }) => {
    return category.map((eachCategory, i) => <CategoryCard eachCategory={eachCategory} loadCategory={loadCategory} key={i} />)
}

export default CategoryList