export function *genDateList(data): IterableIterator<any> {
        for (const index in this.data) {
            if (index) {
                    yield this.data[index].billsAddTimestamp;
                }
            }
        }