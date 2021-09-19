import React from 'react';
import contacts from '../data/data.json';

class ContactsList extends React.Component {
    state = {
        tempDaten: contacts,
        tempSlice: contacts.slice(0, 5),
        tempAtoZ: true
    }

    handleRandomAdd = () => {
        let randomStar = this.state.tempDaten[Math.floor(Math.random() * contacts.length)]
        console.log(randomStar)

        if (!this.state.tempSlice.includes(randomStar)) {
            this.setState({ tempSlice: [...this.state.tempSlice, randomStar] });
        } else {
            return
        }
    }

    hanlseSortByNameAZ = () => {
        let temp = this.state.tempSlice
        temp.sort((a, b) => {
            if (a.name > b.name) {
                return 1
            } else {
                return -1
            }
        })
        this.setState({ tempSlice: temp, tempAtoZ: false })
    }

    hanlseSortByNameZA = () => {
        let temp = this.state.tempSlice
        temp.sort((a, b) => {
            if (a.name < b.name) {
                return 1
            } else {
                return -1
            }
        })
        this.setState({ tempSlice: temp, tempAtoZ: true })
    }

    handleSortByPopularity = () => {
        let temp = this.state.tempSlice
        temp.sort((a, b) => {
            if (a.popularity < b.popularity) {
                return 1
            } else {
                return -1
            }
        })
        this.setState({ tempSlice: temp })
    }

    handleRemovePerson = (pictureUrl) => {
        console.log(pictureUrl)
        let temp = [...this.state.tempSlice]
        console.log(temp)

        // let removed = temp.filter(elt => {
        //     if (elt.pictureUrl === pictureUrl) {
        //         console.log("+")
        //     } else {
        //         console.log("-")
        //         return elt
        //     }
        // })

        let removed = temp.filter(elt => elt.pictureUrl !== pictureUrl)

        this.setState({ tempSlice: removed })
        console.log(removed)
    }

    render() {
        return <div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '2% 0' }}>
                <input onClick={this.handleRandomAdd} type="button" value="Add Random Contact" />
                {this.state.tempAtoZ ? <input onClick={this.hanlseSortByNameAZ} style={{ margin: '0 1%' }} type="button" value="Sort by Name A to Z" /> :
                    <input onClick={this.hanlseSortByNameZA} style={{ margin: '0 1%' }} type="button" value="Sort by Name Z to A" />}
                <input onClick={this.handleSortByPopularity} type="button" value="Sort by Popularity" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table style={{ width: "40%" }}>
                    <tbody>
                        <tr>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Popularity</th>
                        </tr>
                        {this.state.tempSlice.map((elt) =>
                            <tr key={elt.pictureUrl}>
                                <td>
                                    <img style={{ background: "grey", width: "70px", height: "100px" }} src={elt.pictureUrl} alt="" />
                                </td>
                                <td>{elt.name}</td>
                                <td>{elt.popularity.toFixed(2)}</td>
                                <td>
                                    <input onClick={() => this.handleRemovePerson(elt.pictureUrl)} type="button" value="Delete" />
                                </td>
                            </tr>)}
                        <tr>
                            <td>
                                <img src={this.state.tempSlice.pictureUrl} alt="" />
                            </td>
                            <td>{this.state.tempSlice.name}</td>
                            <td>{this.state.tempSlice.popularity}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>;
    }
}

export default ContactsList;