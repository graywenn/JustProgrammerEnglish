import { observable } from 'mobx'

import { IWordDataModel, IWordListDataModel, IWordListQueryModel } from '../models/word';
import { BaseStore } from './base.store';

class WordStore extends BaseStore {
    @observable
    word: IWordDataModel;
    @observable
    wordList: IWordListDataModel[];
    @observable
    showLoadMore: boolean;
    @observable
    wordListQuery: IWordListQueryModel = { page: 0, pageSize: 20 };
    @observable
    wordDetail: IWordDataModel;

    reset = () => {
        this.wordList = [];
        this.wordListQuery.page = 0;
    }

    getWordAsync = async () => {
        this.word = await this.get("word/getWord");
    }

    getNextWordAsync = async () => {
        let _word = await this.get("word/getNextWord");
        if (_word) {
            this.word = _word;
        }
        return _word;
    }

    collectWordAsync = async () => {
        let params = { wordId: this.word.id };
        this.word.collectionId = await this.post("word/collectWord", params);
    }

    collectDetailWordAsync = async () => {
        let params = { wordId: this.wordDetail.id };
        this.wordDetail.collectionId = await this.post("word/collectWord", params);
    }

    getWordListAsync = async () => {
        let _wordList = await this.get("word/getWordList", this.wordListQuery);
        this.wordList = _wordList;
    }

    getMoreWordAsync = async () => {
        this.wordListQuery.page += 1;
        this.getWordListAsync();
    }

    getWordDetailAsync = async (wordId: number) => {
        this.wordDetail = await this.get("word/getWordDetail", { wordId: wordId });
    }
}

export default new WordStore()