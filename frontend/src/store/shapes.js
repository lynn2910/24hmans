import ShapesService from "@/services/shapes.service";

export default {
    namespaced: true,
    state: {
        shapesData: [] // liste des shapes
    },

    mutations: {
        setShapes(state, shapes) {
            state.shapesData = shapes;
        },

        updatedShape(state, updateShape) {
            const index = state.shapesData.findIndex(shape => shape.shape_id === updateShape.shape_id);
            if (index !== -1) {
                state.shapesData.splice(index, 1, updateShape);
            }
        },

        addShape(state, newShape) {
            state.shapesData.push(newShape);
        },

        removeShape(state, shapeId) {
            state.shapesData = state.shapesData.filter(shape => shape.shape_id !== shapeId);
        },

        removeInfosPost(state, infosShape) {
            const index = state.shapesData.findIndex(shape => shape.shape_id === infosShape);
            if (index !== -1) {
                Object.keys(infosShape).forEach(key => {
                    if (infosShape[key] === null) {
                        state.shapesData[index][key] = null;
                    }
                })
            }
        }
    },

    actions: {
        async getAllShapes({commit}) {
            try {
                const res = await ShapesService.getAllShapes(commit);
                if (res.error === 0) {
                    commit("setShapes", res.data);
                } else {
                    console.log(res);
                }
            } catch (error) {
                console.error('Erreur lors de l’appel au service :', error);
            }
        },

        async updateShape({commit}, updatedShape) {
            const res = await ShapesService.updateShape(updatedShape);
            if (res.error === 0) {
                commit('updatedShape', res.data);
            } else {
                console.error(res);
            }
        },

        async deleteInfosPost({commit}, infosShape) {
            const res = await ShapesService.deleteInfosPost(infosShape);
            console.log("Infos ", res)
            if (res.error === 0) {
                commit('removeInfosPost', res.data);
            } else {
                console.error(res);
            }
        },

        async addShape({commit}, newShape) {
            const res = await ShapesService.addShape(newShape);
            if (res.error === 0) {
                commit('addShape', res.data);
            } else {
                console.error(res);
            }
        },

        async deleteShape({commit}, shapeId) {
            const res = await ShapesService.removeShape(shapeId);
            if (res.error === 0) {
                commit('removeShape', res.data);
            } else {
                console.error(res);
            }
        }
    },
    getters: {
        getShapes: (state) => {
            return state.shapesData;
        }
    }
}