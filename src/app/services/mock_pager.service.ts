export class MockPager {
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: 2,
            startPage: 1,
            endPage: 2,
            startIndex: 0,
            endIndex: 9,
            pages: [1,2]
        };
    }
}
