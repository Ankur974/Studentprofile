import React, { useState } from "react";
import { ACCENT_0 } from "./colors";
import styled from "styled-components";
import { H2 } from "./Headings";

const Tabs = ({ TabName1, TabName2, children1, children2 }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = index => {
        setActiveTab(index);
    };
    const Tablist = styled.ul`
    width: 25rem;
    background-color: #f2f2f2;
    justify-content: space-around;
    margin: auto;
    align-items: center;
    height: 4rem;
    display: flex;
    list-style: none;
    column-gap: 2rem;
    cursor: pointer;
  `;
    const List = styled.li`
    background-color: black;
    width: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.4rem;
    border-radius: 2rem;
  `;
    return (
        <div>
            <Tablist>
                {activeTab == 0 ? (
                    <List onClick={() => handleTabClick(0)}>
                        <H2 color={ACCENT_0}>{TabName1}</H2>
                    </List>
                ) : (
                    <li onClick={() => handleTabClick(0)}>
                        <H2>{TabName1}</H2>
                    </li>
                )}

                {activeTab == 1 ? (
                    <List onClick={() => handleTabClick(1)}>
                        <H2 color={ACCENT_0}>{TabName2}</H2>
                    </List>
                ) : (
                    <li
                        className={`tab-item ${activeTab === 1 ? "active" : ""}`}
                        onClick={() => handleTabClick(1)}
                    >
                        <H2>{TabName2}</H2>
                    </li>
                )}
            </Tablist>

            <div className="tab-content">
                {activeTab === 0 && <div>{children1}</div>}
                {activeTab === 1 && <div>{children2}</div>}
            </div>
        </div>
    );
};

export default Tabs;
