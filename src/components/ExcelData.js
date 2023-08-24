import React from "react";

export const Data = ({excelData}) => {
    return excelData.map((individualExcelData) => (
        <tr key={individualExcelData.Id}>
            <th>{individualExcelData.firstName}</th>
            <th>{individualExcelData.lastName}</th>
            <th>{individualExcelData.email}</th>
            <th>{individualExcelData.company}</th>
            <th>{individualExcelData.address}</th>
            <th>{individualExcelData.country}</th>
            <th>{individualExcelData.source}</th>
            <th>{individualExcelData.websiteURL}</th>
            <th>{individualExcelData.SocialMediaLink}</th>
            <th>{individualExcelData.contactDesignation}</th>
            <th>{individualExcelData.contactDepartment}</th>
            <th>{individualExcelData.mobileNumber}</th>
        </tr>
    ))
}