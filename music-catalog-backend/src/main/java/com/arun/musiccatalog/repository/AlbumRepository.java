package com.arun.musiccatalog.repository;

import com.arun.musiccatalog.entity.Album;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class AlbumRepository {

    private static final String COLLECTION_NAME = "albums";

    private final Firestore firestore;

    public AlbumRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    //saving album in the db
    public Album save(Album album) throws ExecutionException, InterruptedException {

        DocumentReference documentReference =
                firestore.collection(COLLECTION_NAME).document();

        album.setId(documentReference.getId());

        ApiFuture<WriteResult> future =
                documentReference.set(album);

        future.get();

        return album;
    }

    // Updating an album in the database
    public Album update(Album album) throws ExecutionException, InterruptedException {

        firestore.collection(COLLECTION_NAME)
                .document(album.getId())
                .set(album)
                .get();

        return album;
    }

    //finding an album in the db by id
    public Album findById(String id) throws ExecutionException, InterruptedException {

        DocumentSnapshot document =
                firestore.collection(COLLECTION_NAME)
                        .document(id)
                        .get()
                        .get();

        if (!document.exists()) {
            return null;
        }

        return document.toObject(Album.class);
    }

    // Fetch all albums belonging to a specific user
    public List<QueryDocumentSnapshot> findAllByUserId(String userId) throws ExecutionException, InterruptedException {

        ApiFuture<QuerySnapshot> future =
                firestore.collection(COLLECTION_NAME)
                        .whereEqualTo("userId", userId)
                        .get();

        return future.get().getDocuments();
    }

    //deleting an album in the db by id
    public void delete(String id) throws ExecutionException, InterruptedException {

        firestore.collection(COLLECTION_NAME)
                .document(id)
                .delete()
                .get();
    }

    //checking if the album already exists in the db for the user
    public boolean existsByUserAndAppleCatalogId(String userId, String appleCatalogId) throws Exception {

    QuerySnapshot snapshot = firestore.collection(COLLECTION_NAME)
            .whereEqualTo("userId", userId)
            .whereEqualTo("appleCatalogId", appleCatalogId)
            .get()
            .get();

    return !snapshot.isEmpty();
}

}