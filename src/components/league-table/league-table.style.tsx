import styled from "styled-components";

import CrownSvg from '../../assets/crown-icon.svg?react';

export const LeagueTableDiv = styled.div`
    tbody{
        :nth-child(1) {
            td{
                background-color: #ffd700d4;
            }
        }
        :nth-child(2) {
            td{
                background-color: #c0c0c0a1;
            }
        }
        :nth-child(3) {
            td{
                background-color: #ff5733b5;
            }
        }
    }
    th {
        font-size: 0.9rem;
    }
`

export const CrownIcon = styled(CrownSvg)`
    height: 1rem;
    margin-top: 0.25rem;
    float: right;
`