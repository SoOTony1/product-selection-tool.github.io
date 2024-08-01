import React, { useState } from 'react';
import './App.css';

const productData = {
    温度计: {
        name: '温度计',
        subcategories: {
            一体化温度计: { name: '一体化温度计', options: [{ code: 'YHN10', name: '一体化温度计' }] },
            环境温度计: { name: '环境温度计', options: [{ code: 'YHN434', name: '环境温度计' }] },
        }
    },
    接线盒: {
        name: '接线盒',
        subcategories: {
            防水接线盒: {
                name: '防水接线盒',
                options: [
                    { code: 'YH03', name: '防水接线盒', description: '材质: 铸铝\n防护等级: IP65\n仪表接口: M24x1.5\n防爆: 无\n显示: 无' }
                ]
            },
            非显示防爆接线盒: {
                name: '非显示防爆接线盒',
                options: [
                    { code: 'YH21', name: '非显示防爆接线盒', description: '材质: 铸铝\n防护等级: IP66\n仪表接口: M20x1.5\n防爆: Exd IIC T4\n显示: 无' }
                ]
            },
            显示防爆接线盒: {
                name: '显示防爆接线盒',
                options: [
                    { code: 'YH15', name: '显示防爆接线盒', description: '材质: 铸铝\n防护等级: IP66\n仪表接口: M20x1.5\n防爆: Exd IIC T4\n显示: LCD' }
                ]
            }
        }
    },
};

function App() {
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentSubcategory, setCurrentSubcategory] = useState(null);
    const [currentOption, setCurrentOption] = useState(null);

    const renderMainCategories = () => (
        <div>
            {Object.entries(productData).map(([key, value]) => (
                <div key={key} className="product-category">
                    <h2>{value.name}</h2>
                    <ul className="product-options">
                        <li onClick={() => selectCategory(key)}>{key} - {value.name}</li>
                    </ul>
                </div>
            ))}
        </div>
    );

    const selectCategory = (category) => {
        setCurrentCategory(category);
        setCurrentSubcategory(null);
        setCurrentOption(null);
    };

    const renderSubcategories = () => (
        <div>
            <button className="back-button" onClick={() => setCurrentCategory(null)}>返回上一级</button>
            {Object.entries(productData[currentCategory].subcategories).map(([key, value]) => (
                <div key={key} className="product-category">
                    <h2>{value.name}</h2>
                    <ul className="product-options">
                        <li onClick={() => selectSubcategory(key)}>{key} - {value.name}</li>
                    </ul>
                </div>
            ))}
        </div>
    );

    const selectSubcategory = (subcategory) => {
        setCurrentSubcategory(subcategory);
        setCurrentOption(null);
    };

    const renderOptions = () => (
        <div>
            <button className="back-button" onClick={() => setCurrentSubcategory(null)}>返回上一级</button>
            <div className="product-category">
                <h2>{productData[currentCategory].subcategories[currentSubcategory].name}</h2>
                <ul className="product-options">
                    {productData[currentCategory].subcategories[currentSubcategory].options.map(option => (
                        <li key={option.code} onClick={() => selectOption(option)}>{option.code} - {option.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );

    const selectOption = (option) => {
        setCurrentOption(option);
    };

    const renderOptionDetails = () => (
        <div>
            <button className="back-button" onClick={() => setCurrentOption(null)}>返回上一级</button>
            <div className="product-category">
                <h2>{currentOption.name}</h2>
                <pre>{currentOption.description}</pre>
            </div>
        </div>
    );

    return (
        <div className="container">
            <h1>多层级产品选型</h1>
            <div id="product-selection">
                {!currentCategory ? renderMainCategories() :
                    !currentSubcategory ? renderSubcategories() :
                        !currentOption ? renderOptions() :
                            renderOptionDetails()}
            </div>
        </div>
    );
}

export default App;

