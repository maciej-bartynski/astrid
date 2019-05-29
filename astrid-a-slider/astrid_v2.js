import React, { Component } from 'react';
import AstridGroup from './AstridCarousel_new/astridGroup';
import AstridNavigator from './AstridCarousel_new/astridNavigator';
import AstridCarousel from './AstridCarousel_new';
import AstridPointer from './AstridCarousel_new/astridPointer';
import ImageComponent from './custom_components/Image'
import Description from './custom_components/Description.js';
import Pointer from './custom_components/Pointer.js';

class Navigator extends Component {
    render = () => {
        const { left_edge, right_edge, active_position, title, by } = this.props;
        const visible = (left_edge && title === 'left') || (right_edge && title === 'right') ? false : true;

        return (
            <div
                style={{
                    padding: '10px 20px',
                    opacity: (visible ? 1 : 0.4),
                    background: 'gray',
                    color: 'white',
                    border: '1px solid white',
                    cursor: 'pointer',
                    width: 250,
                    display: 'inline-block',
                    boxSizing: 'border-box',
                }}
            >{title}{' '}{by} </div>
        )
    }
}

class Astrid_v2 extends Component {
    render = () => {
        const descriptionArr = this.props.titles.map((title) => <Description {...{ title, some_user_prop: false }} />)
        const imagesArray_hor = this.props.images.map((image, index) => <ImageComponent {...{ image, some_user_prop: false }} />)
        const imagesArray_ver = this.props.images.map((image, index) => <ImageComponent {...{ image, some_user_prop: true }} />)

        const config = {
            columns: 2,
            mode: 'finite',
            grid: true,
        }

        const config2 = {
            columns: 3,
            mode: 'finite',
            grid: false,
        }

        const config3 = {
            columns: 3,
            mode: 'finite',
            grid: true,
        }

        const config4 = {
            columns: 3,
            mode: 'finite',
            grid: true,
            axis: 'vertical',
        }

        const config5 = {
            columns: 3,
            mode: 'finite',
            grid: false,
            axis: 'vertical',
        }

        const config6 = {
            columns: 2,
            mode: 'finite',
            grid: true,
            axis: 'vertical',
        }

        return (
            <div className='root'>
                <div className='gridContainer'>
                    <AstridGroup>
                        <div className='gridTop'>
                            <h1>Astrid. A carousel.</h1>
                            <div className='navigatorsContainer'>
                                <AstridNavigator by={-1}><Navigator title={'left'} by={-1} /></AstridNavigator>
                                <AstridNavigator by={1}><Navigator title={'right'} by={1} /></AstridNavigator>
                            </div>
                        </div>

                        <div className='horizontalSlider_grid'>
                            <h2>Horizontal, cells: grid</h2>
                            <AstridCarousel {...config}>
                                {imagesArray_hor}
                            </AstridCarousel>
                        </div>

                        <div className='horizontalSlider_noGrid'>
                            <h2>Horizontal, cells: nogrid (irregular as fuck)</h2>
                            <div className='carouselWrapperToShowSize'>
                                <AstridCarousel {...config2}>
                                    {descriptionArr}
                                </AstridCarousel>
                            </div>
                        </div>
                        <div className='horizontalSlider_pointers'>
                            <h2>Carousel with pointers (clickable)</h2>
                            <AstridCarousel {...config3}>
                                {descriptionArr.map((item, indx) => {
                                    return (
                                        <AstridPointer to={indx} key={'pointer' + indx}>
                                            <Pointer to={indx} />
                                        </AstridPointer>
                                    )
                                })}
                            </AstridCarousel>
                        </div>
                        <div className='verticalSlider_grid'>
                            <AstridCarousel {...config4}>
                                {imagesArray_ver}
                            </AstridCarousel>
                        </div>
                        <div className='verticalSlider_noGrid'>
                            <div className='carouselWrapperToShowSize_vert'>
                                <AstridCarousel {...config5}>
                                    {descriptionArr}
                                </AstridCarousel>
                            </div>
                        </div>
                        <div className='verticalSlider_pointers'>
                            <AstridCarousel {...config6}>
                                {descriptionArr.map((item, indx) => {
                                    return (
                                        <AstridPointer to={indx} key={'pointer' + indx}>
                                            <Pointer to={indx} isThin={false} />
                                        </AstridPointer>
                                    )
                                })}
                            </AstridCarousel>
                        </div>
                    </AstridGroup>

                </div>
            </div>
        )
    }
}

export default Astrid_v2;