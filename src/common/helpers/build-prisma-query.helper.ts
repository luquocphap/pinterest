import { FindImageDto } from "src/modules-api/images/dto/find-image.dto";

export const buildQueryPrisma = (query: FindImageDto) => {
    let { page, pageSize, queryName } = query;

    const pageDefault = 1;
    const pageSizeDefault = 3;

    // ĐẢM BẢO LÀ SỐ
    page = Number(page);
    pageSize = Number(pageSize);

    // nếu gửi chữ
    page = Number(page) || pageDefault;
    pageSize = Number(pageSize) || pageSizeDefault;

    // nếu mà số âm
    if (page < 1) page = pageDefault;
    if (pageSize < 1) pageSize = pageSizeDefault;

    // xử lý index
    const index = (page - 1) * pageSize;

    console.log({ page, pageSize, index, queryName });

    const where = {
        title: {
            contains: queryName || ""
        },
        isDeleted: false,
    };

    return {
        page,
        pageSize,
        index,
        where,
    };
};
